"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const nextLocale = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="inline-flex h-8 items-center rounded-md px-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
