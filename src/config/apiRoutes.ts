// /src/config/apiRoutes.ts
export const API_URL_CLIENT = process.env.NEXT_PUBLIC_API_URL; // Lấy từ .env.local

export const apiRoutes = {
    AUTH: {
        BASE: '/auth',
        CHECK_EMAIL: '/auth/check-email',
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        REFRESH_TOKEN: '/auth/refresh-token',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        MY_PERMISSIONS: '/auth/my-permissions',
        USERS: '/auth/users',
        UPDATE: '/auth/update',
        GOOGLE: '/auth/google',
        GOOGLE_REDIRECT: '/auth/google/redirect',
        REQUEST_PASSWORD_RESET: '/auth/request-password-reset',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD_WITH_TOKEN: '/auth/reset-password/token',
        RESET_PASSWORD_WITH_OTP: '/auth/reset-password/otp',
        CHECK_PERMISSION: '/auth/check-permission',
    },
    CONTACTS: {
        BASE: '/contacts',
        CREATE: '/contacts',
        GET_ALL: '/contacts',
        GET_BY_ID: (id: string) => `/contacts/${id}`,
        DELETE: (id: string) => `/contacts/${id}`,
    },
    BANNER: {
        BASE: '/banner',
        PUBLIC: (placement: string) =>
            `/banner/public/${encodeURIComponent(placement)}`,
        LIST: (placement?: string) =>
            placement
                ? `/banner?placement=${encodeURIComponent(placement)}`
                : '/banner',
        REORDER: (placement: string) =>
            `/banner/placement/${encodeURIComponent(placement)}/reorder`,
        UPDATE: (publicId: string) =>
            `/banner/${encodeURIComponent(publicId)}`,
        DELETE: (publicId: string) =>
            `/banner/${encodeURIComponent(publicId)}`,
    },
    USERS: {
        BASE: '/usersapi',
        GET_ME: '/usersapi/me',
        UPDATE_ME: '/usersapi/me',
        GET_ALL: '/usersapi',
        GET_BY_ID: (id: string) => `/usersapi/${id}`,
        CREATE: '/usersapi',
        UPDATE: (id: string) => `/usersapi/${id}`,
        DELETE: (id: string) => `/usersapi/${id}`,
    },
    BLOG: {
        BASE: '/blog',
        GET_ALL: (page: number = 1, limit: number = 10, includeHidden: boolean = false) =>
            `/blog?page=${page}&limit=${limit}&includeHidden=${includeHidden}`,
        GET_PUBLIC: (page: number = 1, limit: number = 10) =>
            `/blog/public?page=${page}&limit=${limit}`,
        GET_BY_SLUG: (slug: string) => `/blog/${slug}`,
        SEARCH: (q: string, page: number = 1, limit: number = 10) =>
            `/blog/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`,
        GET_BY_STATUS: (status: string, page: number = 1, limit: number = 10) =>
            `/blog/status/${status}?page=${page}&limit=${limit}`,
    },
};

// For backward compatibility
export const API_ROUTES = apiRoutes;
