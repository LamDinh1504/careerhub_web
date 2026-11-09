"use client"; // Required to use hooks in the App Router

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL_CLIENT } from "@/config/apiRoutes";

// User roles
type UserRole = "user" | "admin" | "staff" | "manager" | "technical";

// Permission interfaces
interface Permission {
  id: string;
  resource: string;
  action: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  fullName?: string;
  avatar?: string;
}

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken?: string) => Promise<void>;
  logout: () => void;
  hasAdminAccess: () => boolean;
  verifyToken: (storedToken?: string) => Promise<void>;
}

const BASE_URL = API_URL_CLIENT;

const maskToken = (value?: string | null): string => {
  if (!value) {
    return "missing";
  }
  if (value.length <= 12) {
    return value;
  }
  return `${value.slice(0, 6)}...${value.slice(-6)}`;
};

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));

    if (!cookie) {
      console.log(`[Auth] Cookie '${name}' not found. Available cookies:`, cookies.map(c => c.split('=')[0]));
      return null;
    }

    const value = cookie.substring(name.length + 1); // More reliable than split
    const decoded = decodeURIComponent(value);

    console.log(`[Auth] Cookie '${name}' read successfully, length=${decoded.length}`);
    return decoded;
  } catch (error) {
    console.error(`[Auth] Error reading cookie '${name}':`, error);
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const shouldClearRefreshTokenFromError = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  const statusCode = error.response?.status;
  return statusCode === 401 || statusCode === 403;
};

type AuthProviderProps = {
  children: ReactNode;
  initialUser?: AuthUser | null;
  initialAccessToken?: string | null;
  initialRefreshToken?: string | null;
};

export const AuthProvider = ({
  children,
  initialUser = null,
  initialAccessToken = null,
  initialRefreshToken = null,
}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(initialAccessToken);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    initialRefreshToken
  );
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialUser));
  const router = useRouter();
  const hasInitializedRef = useRef(false);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasWindow = typeof window !== "undefined";

  const clearAuthState = useCallback(
    (options?: { keepRefreshToken?: boolean }) => {
      const keepRefreshToken = options?.keepRefreshToken ?? false;
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);

      if (!keepRefreshToken) {
        setRefreshToken(null);
      }

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }

      // Không cần xóa localStorage và cookies nữa vì backend quản lý cookies
      // Chỉ xóa nếu có dữ liệu cũ
      if (hasWindow) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    },
    [hasWindow]
  );

  const logout = () => {
    clearAuthState();

    // Gọi API logout để backend clear cookies
    void axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true, // Quan trọng: gửi cookies
      }
    );

    router.replace("/login");
  };

  const fetchMe = useCallback(async (accessToken: string): Promise<AuthUser> => {
    const response = await axios.get(`${BASE_URL}/auth/status`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const serverUser = response.data as {
      id: number | string;
      email: string;
      fullName?: string | null;
      status?: string;
      role?: UserRole;
    };

    if (!serverUser || !serverUser.id) {
      throw new Error("Invalid user payload");
    }

    const normalizedStatus = (serverUser.status ?? "").toLowerCase();
    if (normalizedStatus && normalizedStatus !== "active") {
      throw new Error("User is not active");
    }

    return {
      id: String(serverUser.id),
      email: serverUser.email,
      role: serverUser.role ?? "user",
      permissions: [],
      fullName: serverUser.fullName ?? serverUser.email,
    };
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    try {
      console.log("[Auth] Refresh request", {
        endpoint: `${BASE_URL}/auth/refresh`,
        hasRefreshToken: Boolean(readCookie("refreshToken")),
      });

      const response = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {},
        {
          withCredentials: true, // Quan trọng: gửi cookies (refreshToken)
        }
      );

      const responseData = response.data as {
        token?: string;
        refreshToken?: string;
        tokenExpires?: number;
      };

      const newAccessToken = responseData.token;
      const newRefreshToken = responseData.refreshToken;

      console.log("[Auth] Refresh response", {
        status: response.status,
        hasToken: Boolean(newAccessToken),
        hasRefreshToken: Boolean(newRefreshToken),
        token: maskToken(newAccessToken),
        refreshToken: maskToken(newRefreshToken),
      });

      if (!newAccessToken) return false;

      // Backend đã tự động set cookies, chỉ cần update state
      setToken(newAccessToken);
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      const me = await fetchMe(newAccessToken);
      setUser(me);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Failed to refresh token (axios):", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
          hasRefreshTokenCookie: Boolean(readCookie("refreshToken")),
        });
      } else {
        console.error("❌ Failed to refresh token:", error);
      }

      if (shouldClearRefreshTokenFromError(error)) {
        clearAuthState();
      }

      return false;
    }
  }, [clearAuthState, fetchMe]);

  const scheduleRefresh = useCallback(
    (accessToken: string) => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      try {
        const { exp } = jwtDecode<{ exp: number }>(accessToken);
        if (!exp) return;

        const expiresIn = exp * 1000 - Date.now();
        const refreshTime = Math.max(expiresIn - 60_000, 0);

        refreshTimeoutRef.current = setTimeout(() => {
          void refreshAccessToken();
        }, refreshTime);
      } catch (error) {
        console.error("Invalid token for scheduling refresh:", error);
      }
    },
    [refreshAccessToken]
  );

  const verifyToken = useCallback(
    async (storedToken?: string): Promise<void> => {
      // Always read fresh from cookie, don't rely on state
      const tokenToVerify = storedToken ?? readCookie("token");

      if (!tokenToVerify) {
        // No access token available, try refresh flow regardless of JS-visible cookie state
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          clearAuthState();
        }
        return;
      }

      try {
        const me = await fetchMe(tokenToVerify);
        setToken(tokenToVerify);
        setUser(me);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("❌ Token verification failed:", error);

        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          clearAuthState();
        }
      }
    },
    [refreshAccessToken, clearAuthState, fetchMe]
  );

  // Init auth on mount (verify access token -> refresh if needed)
  useEffect(() => {
    if (hasInitializedRef.current) return;
    if (!hasWindow) return;

    hasInitializedRef.current = true;

    const init = async () => {
      console.log("[Auth] Init started");

      if (initialUser && initialAccessToken) {
        console.log("[Auth] Using initial props, but fetching fresh user data");
        setToken(initialAccessToken);
        setRefreshToken(initialRefreshToken);

        // Fetch fresh user data instead of using stale initialUser
        try {
          const freshUser = await fetchMe(initialAccessToken);
          setUser(freshUser);
          setIsAuthenticated(true);
          console.log("[Auth] Fresh user data loaded", { role: freshUser.role });
        } catch (error) {
          console.error("[Auth] Failed to fetch fresh user data:", error);
          // Fallback to initialUser if fetch fails
          setUser(initialUser);
          setIsAuthenticated(true);
        }
        return;
      }

      // Đọc token từ cookie (backend đã set)
      const storedToken = readCookie("token");
      const storedRefreshToken = readCookie("refreshToken");

      console.log("[Auth] Init - tokens from cookies", {
        hasToken: Boolean(storedToken),
        hasRefreshToken: Boolean(storedRefreshToken),
        token: maskToken(storedToken),
        refreshToken: maskToken(storedRefreshToken),
      });

      if (storedToken) setToken(storedToken);
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);

      // verifyToken() already attempts refresh if needed.
      await verifyToken(storedToken ?? undefined);

      console.log("[Auth] Init completed");
    };

    void init();
  }, [hasWindow, initialUser, initialAccessToken, initialRefreshToken, verifyToken, fetchMe]);

  useEffect(() => {
    if (!token) {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
      return;
    }

    scheduleRefresh(token);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [token, scheduleRefresh]);

  const login = async (newToken: string, newRefreshToken?: string) => {
    if (!newRefreshToken) {
      clearAuthState();
      throw new Error("Missing refresh token");
    }

    // Backend đã tự động set cookies, chỉ cần update state
    setToken(newToken);
    setRefreshToken(newRefreshToken);

    setIsAuthenticated(false);
    setUser(null);

    await verifyToken(newToken);
    router.replace("/");
  };

  /**
   * Check admin access based on the new roles.
   */
  const hasAdminAccess = (): boolean => {
    if (!user) {
      return false;
    }

    if (user.role === "admin") {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        user,
        isAuthenticated,
        verifyToken,
        login,
        logout,
        hasAdminAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook for using the AuthContext in components.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
