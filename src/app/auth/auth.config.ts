import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLogIn = !!auth?.user;
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");
      const isPrivateRoutes = !isAuthRoutes && nextUrl.pathname.startsWith("/");

      const isAdmin = auth?.user?.roles?.includes("admin");
      const isAdminRoutes = nextUrl.pathname.startsWith("/admin");

      if (!isLogIn && isPrivateRoutes) {
        return false;
      }

      if (isLogIn && isAuthRoutes) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isAdminRoutes && !isAdmin) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.status = user.status;
        token.roles = user.roles;
        token.company = user.company;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session({ session, token }) {
      if (token.roles) session.user.roles = token.roles;
      if (token.company) session.user.company = token.company;
      if (token.firstName) session.user.firstName = token.firstName;
      if (token.lastName) session.user.lastName = token.lastName;
      if (token.status) session.user.status = token.status;
      return session;
    },
  },
} as NextAuthConfig;
