import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing, publicPages } from "./i18n/routing";
import { auth } from "@/auth";

const intlMiddleware = createIntlMiddleware(routing);


function isVerifyPath(pathname: string) {
  const localePattern = routing.locales.join("|");
  const regex = new RegExp(`^(/(${localePattern}))?/verify/[^/]+$`);
  return regex.test(pathname);
}

// Helper check public route
function isPublicPath(pathname: string) {
  if (isVerifyPath(pathname)) {
    return true;
  }
  
  // 2. Kiểm tra các public pages khác
  const publicRegex = new RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  return publicRegex.test(pathname);
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  
  // Skip NextAuth API routes (avoid redirect loop)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isPublic = isPublicPath(pathname);

  // Public page → handle i18n only
  if (isPublic) {
    return intlMiddleware(req);
  }

  // ✅ 3. Private page → requires authentication 
  if (!req.auth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Already logged in -> allow access and handle locale
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};