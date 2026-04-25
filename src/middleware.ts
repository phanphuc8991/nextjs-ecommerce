import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing, publicPages } from "./i18n/routing";
import { auth } from "@/auth";

const intlMiddleware = createIntlMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/");
  const locale = segments[1];
  if (routing.locales.includes(locale as any)) {
    return locale;
  }
  return routing.defaultLocale;
}

function isPublicPage(pathname: string, locale: string) {
  const regex = new RegExp(`^/${locale}(/|$)`);
  const pathWithoutLocale = pathname.replace(regex, "/").replace(/\/$/, "") || "/";
  

  return publicPages.some((pattern) => {
    return (
      pathWithoutLocale === pattern ||
      pathWithoutLocale.startsWith(`${pattern}/`)
    );
  });
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const locale = getLocaleFromPathname(pathname);
  const isLoggedin = !!req.auth;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isPublic = isPublicPage(pathname, locale);

 
  if (!isLoggedin && !isPublic) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(/|$)`), "/").replace(/\/$/, "") || "/";
  if (isLoggedin && pathWithoutLocale.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

 
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};