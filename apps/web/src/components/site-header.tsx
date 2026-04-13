import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-primary">
          JH.
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("blog")}
          </Link>
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("projects")}
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("about")}
          </Link>
          <LocaleToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
