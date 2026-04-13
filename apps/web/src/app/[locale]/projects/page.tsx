import { getTranslations, getLocale } from "next-intl/server";
import { getPublishedProjects } from "@my-site/db";
import { createServerClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/project-card";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const supabase = createServerClient();
  const projects = await getPublishedProjects(supabase);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              demoLabel={t("demo")}
              sourceLabel={t("source")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
