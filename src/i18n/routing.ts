import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always", 
  pathnames: {
    "/": "/",
    "/login": "/login",
    "/dashboard": "/dashboard"
  },
});
export const publicPages = ["/","/auth/login",'/auth/signup'];

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];