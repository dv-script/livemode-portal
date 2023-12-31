import { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [],
    pages: {
        signIn: '/auth/sign-in',
    },
    callbacks: {
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLogIn = !!auth?.user;
            const isAuthRoutes = nextUrl.pathname.startsWith('/auth');
            const isPrivateRoutes = !isAuthRoutes && nextUrl.pathname.startsWith('/');

            const isAdmin = auth?.user?.roles?.includes('admin');
            const isAdminRoutes = nextUrl.pathname.startsWith('/admin');

            if (!isLogIn && isPrivateRoutes) {
                return false;
            }

            if (isLogIn && isAuthRoutes || isAdminRoutes && !isAdmin) {
                return Response.redirect(new URL('/', nextUrl));
            }

            return true
        },
        jwt({ token, user }) {
            if (user) token.roles = user.roles
            return token;
        },
        session({ session, token }) {
            if (token.roles) session.user.roles = token.roles
            return session;
        }
    }
} as NextAuthConfig;
