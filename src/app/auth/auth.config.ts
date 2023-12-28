import { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [],
    pages: {
        signIn: '/auth/sign-in'
    },
    callbacks: {
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLogIn = !!auth?.user;
            const isPrivateRoutes = nextUrl.pathname.startsWith('/');
            const isAuthRoutes = nextUrl.pathname.startsWith('/auth');

            if (!isLogIn && isPrivateRoutes) {
                return false;
            }

            if (isLogIn && isAuthRoutes) {
                return Response.redirect(new URL('/', nextUrl));
            }

            return true
        }
    }
} as NextAuthConfig;
