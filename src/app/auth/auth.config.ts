import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");
      const isPrivateRoutes = !isAuthRoutes && nextUrl.pathname.startsWith("/");
      const isAdminRoutes =
        isPrivateRoutes && nextUrl.pathname.startsWith("/admin");
      const hasAdminAccess = auth?.user?.roles?.includes("admin");

      if (isLoggedIn && isAuthRoutes) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isAdminRoutes && !hasAdminAccess) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      const expireIn = 60 * 60 * 24;
      const expirationDate = new Date(Date.now() + expireIn);

      if (user) {
        token.expires = expirationDate.toISOString();
        token.status = user.status;
        token.roles = user.roles;
        token.company = user.company;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session({ session, token }) {
      if (token.expires) session.expires = token.expires;
      if (token.roles) session.user.roles = token.roles;
      if (token.company) session.user.company = token.company;
      if (token.firstName) session.user.firstName = token.firstName;
      if (token.lastName) session.user.lastName = token.lastName;
      if (token.status) session.user.status = token.status;
      return session;
    },
  },
} as NextAuthConfig;
