import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");

  return (
    <div className="container mx-auto px-4">
      <section className="flex flex-col items-start justify-center py-24 md:py-32">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("greeting")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/blog"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            {nav("blog")}
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-10 items-center rounded-lg border border-input bg-background px-6 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {nav("projects")}
          </Link>
        </div>
      </section>
    </div>
  );
}
