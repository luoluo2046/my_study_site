import { getTranslations, getLocale } from "next-intl/server";
import { getPublishedProjects } from "@my-site/db";
import { createServerClient } from "@/lib/supabase/server";
import { ProjectsList } from "@/components/projects-list";
import type { Project } from "@my-site/db";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  let projects: Project[] = [];
  try {
    const supabase = createServerClient();
    projects = await getPublishedProjects(supabase);
  } catch {
    // Supabase 连接失败时显示空列表
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

      <ProjectsList
        projects={projects}
        locale={locale}
        demoLabel={t("demo")}
        sourceLabel={t("source")}
        searchPlaceholder={t("searchPlaceholder")}
        emptyText={t("empty")}
        noResultsText={t("noResults")}
      />
    </div>
  );
}
