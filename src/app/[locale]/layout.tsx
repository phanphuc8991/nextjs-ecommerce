import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import NextAuthWrapper from "@/lib/nextauth-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { geist, outfit } from "@/fonts";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { GlobalError } from "@/components/global-error";
import { GlobalLoading } from "@/components/global-loading";
import GlobalLoadingHandler from "@/components/global-loading-handler";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${geist.variable} ${outfit.variable} text-base`}
    >
      <body className={`antialiased bg-neutral-50`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NextAuthWrapper>
            <TooltipProvider> {children} </TooltipProvider>
          </NextAuthWrapper>
        </NextIntlClientProvider>
        <Toaster className="z-[1000]" />
        <GlobalError />
        <GlobalLoading />
        <GlobalLoadingHandler />
      </body>
    </html>
  );
}
