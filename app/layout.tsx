import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Manrope } from "next/font/google";
import { AuthProvider, type AuthUser } from "@/context/AuthContext";
import { API_URL_CLIENT } from "@/config/apiRoutes";
import "./globals.css";
import "./suneditor-contents.css";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CareerHub",
  description: "CareerHub - Authentication & User Management",
};

const normalizeServerUser = (serverUser: {
  id: number | string;
  email: string;
  fullName?: string | null;
  status?: string;
  role?: string;
}): AuthUser => {
  return {
    id: String(serverUser.id),
    email: serverUser.email,
    role: (serverUser.role as AuthUser["role"]) ?? "user",
    permissions: [],
    fullName: serverUser.fullName ?? serverUser.email,
  };
};

const fetchUserOnServer = async (
  accessToken: string,
): Promise<AuthUser | null> => {
  if (!API_URL_CLIENT) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL_CLIENT}/auth/status`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        Cookie: `token=${accessToken}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      id?: number | string;
      email?: string;
      fullName?: string | null;
      status?: string;
      role?: string;
    } | null;

    if (!data?.id || !data.email) {
      return null;
    }

    const normalizedStatus = (data.status ?? "").toLowerCase();
    if (normalizedStatus && normalizedStatus !== "active") {
      return null;
    }

    return normalizeServerUser({
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      status: data.status,
      role: data.role,
    });
  } catch {
    return null;
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  // Đọc cookies từ backend
  const accessToken = cookieStore.get("token")?.value ?? null;
  const refreshToken = cookieStore.get("refreshToken")?.value ?? null;

  const initialUser = accessToken ? await fetchUserOnServer(accessToken) : null;

  return (
    <html lang="vi" className={manrope.variable}>
      <body className="bg-[#F3FAF5] font-sans antialiased text-[#0D3B2E]">
        <AuthProvider
          initialUser={initialUser}
          initialAccessToken={accessToken}
          initialRefreshToken={refreshToken}
        >
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
