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
      const statusActive = auth?.user?.status === "active" ? true : false;

      const hasAdminAccess = auth?.user?.roles?.includes("admin");
      const hasB2bPortalAccess = auth?.user?.roles?.includes("b2b-portal");
      const hasPhotoDatabaseAccess =
        auth?.user?.roles?.includes("photo-database");
      const hasCommentaryLiveSystemAccess = auth?.user?.roles?.includes(
        "commentary-live-system"
      );
      const hasCostumerServiceToolAccess = auth?.user?.roles?.includes(
        "costumer-service-tool"
      );
      const hasMatchAnalysisHubAccess =
        auth?.user?.roles?.includes("match-analysis-hub");
      const hasMediaPortalAccess = auth?.user?.roles?.includes("media-portal");

      const isAdminRoutes = nextUrl.pathname.startsWith("/admin");
      const isB2bRoutes = nextUrl.pathname.startsWith("/b2b-portal");
      const isPhotoDatabaseRoutes =
        nextUrl.pathname.startsWith("/photo-database");
      const isCommentaryLiveSystemRoutes = nextUrl.pathname.startsWith(
        "/commentary-live-system"
      );
      const isCostumerServiceToolRoutes = nextUrl.pathname.startsWith(
        "/costumer-service-tool"
      );
      const isMatchAnalysisHubRoutes = nextUrl.pathname.startsWith(
        "/match-analysis-hub"
      );
      const isMediaPortalRoutes = nextUrl.pathname.startsWith("/media-portal");

      if (!isLogIn && isPrivateRoutes) {
        return false;
      }

      if (isLogIn && isAuthRoutes) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isAdminRoutes && !hasAdminAccess && !statusActive) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isB2bRoutes && !hasB2bPortalAccess && !statusActive) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isPhotoDatabaseRoutes && !hasPhotoDatabaseAccess && !statusActive) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (
        isCommentaryLiveSystemRoutes &&
        !hasCommentaryLiveSystemAccess &&
        !statusActive
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (
        isCostumerServiceToolRoutes &&
        !hasCostumerServiceToolAccess &&
        !statusActive
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (
        isMatchAnalysisHubRoutes &&
        !hasMatchAnalysisHubAccess &&
        !statusActive
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isMediaPortalRoutes && !hasMediaPortalAccess && !statusActive) {
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
