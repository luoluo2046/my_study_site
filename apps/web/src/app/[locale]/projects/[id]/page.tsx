import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { getProjectById } from "@my-site/db";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

interface ProjectDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const t = await getTranslations("projectDetail");
  const locale = await getLocale();

  let project;
  try {
    const supabase = createServerClient();
    project = await getProjectById(supabase, id);
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const title = locale === "en" && project.title_en ? project.title_en : project.title;
  const description = locale === "en" && project.description_en ? project.description_en : project.description;

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href={`/${locale}/projects`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        ← {t("back")}
      </Link>

      <article className="max-w-4xl mx-auto">
        {project.cover_url && (
          <div className="aspect-video overflow-hidden rounded-xl bg-muted mb-8 relative">
            <Image
              src={project.cover_url}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">{description}</p>
        </div>

        {project.tech_stack.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{t("techStack")}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("viewDemo")}
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
            >
              {t("viewSource")}
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
