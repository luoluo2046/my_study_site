import { useTranslations } from "next-intl";

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-muted-foreground">
        博客文章即将到来。MDX 内容系统将在后续集成。
      </p>
    </div>
  );
}
