import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import NextAuthWrapper from "@/lib/nextauth-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { geist, outfit } from "@/fonts";

import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getTranslations,
  setRequestLocale,
  getMessages,
} from "next-intl/server";
import { clsx } from "clsx";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { GlobalErrorProvider } from "@/components/global-error-provider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// export async function generateMetadata(
//   props: Omit<LayoutProps<"/[locale]">, "children">,
// ) {
//   const { locale } = await props.params;

//   const t = await getTranslations({
//     locale: locale as Locale,
//     namespace: "LocaleLayout",
//   });

//   return {
//     title: t("title"),
//   };
// }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${geist.variable} ${outfit.variable} text-base`}
    >
      <body className={`antialiased bg-neutral-50`}>
        <GlobalErrorProvider>
        <NextIntlClientProvider>
          <NextAuthWrapper>
            <TooltipProvider> {children} </TooltipProvider>
          </NextAuthWrapper>
        </NextIntlClientProvider>
        </GlobalErrorProvider>
        <Toaster className="z-[1000]" />
      </body>
    </html>
  );
}
