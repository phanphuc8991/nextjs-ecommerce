import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "en",
  localePrefix: "always", 
  pathnames: {
    "/": "/",
    "/login": "/login",
    "/dashboard": "/dashboard"
  },
});
export const publicPages = ["/","/auth","/search",'/product','/checkout'];

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];