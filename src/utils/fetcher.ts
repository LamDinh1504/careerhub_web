type RefreshResponse = {
  token?: string;
  refreshToken?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('refreshToken');
};

const setStoredAccessToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('token', token);
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getStoredRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as RefreshResponse;

  if (!data.token) {
    return null;
  }

  setStoredAccessToken(data.token);

  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  return data.token;
};

const fetcher = async <T>(
  url: string,
  init?: RequestInit,
  isRetrying = false,
): Promise<T> => {
  const response = await fetch(url, init);

  if (response.status === 401 && !isRetrying) {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      throw new Error('Unauthorized');
    }

    const retryHeaders = new Headers(init?.headers);
    retryHeaders.set('Authorization', `Bearer ${newAccessToken}`);

    return fetcher<T>(
      url,
      {
        ...init,
        headers: retryHeaders,
      },
      true,
    );
  }

  if (!response.ok) {
    throw new Error(response.statusText || 'Request failed');
  }

  return (await response.json()) as T;
};

export default fetcher;
