import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-muted-foreground">
        作品集将从 Supabase 加载。请先完成 Supabase 项目初始化。
      </p>
    </div>
  );
}
