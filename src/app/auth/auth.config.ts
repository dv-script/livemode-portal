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

      if ((isLogIn && isAuthRoutes) || (isAdminRoutes && !isAdmin)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.email = user.email;
        token.company = user.company;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
      }
      return token;
    },
    session({ session, token }) {
      if (token.roles) session.user.roles = token.roles;
      if (token.company) session.user.company = token.company;
      if (token.email) session.user.email = token.email;
      if (token.first_name) session.user.first_name = token.first_name;
      if (token.last_name) session.user.last_name = token.last_name;
      return session;
    },
  },
} as NextAuthConfig;
