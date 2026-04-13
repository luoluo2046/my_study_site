import type { Project } from "@my-site/db";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  locale: string;
  demoLabel: string;
  sourceLabel: string;
}

export function ProjectCard({ project, locale, demoLabel, sourceLabel }: ProjectCardProps) {
  const title = locale === "en" && project.title_en ? project.title_en : project.title;
  const description = locale === "en" && project.description_en ? project.description_en : project.description;

  return (
    <Link href={`/${locale}/projects/${project.id}`} className="group rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md block">
      {project.cover_url && (
        <div className="aspect-video overflow-hidden bg-muted relative">
          <Image
            src={project.cover_url}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        {project.tech_stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-3">
          {project.demo_url && (
            <span className="text-sm text-primary hover:underline">
              {demoLabel}
            </span>
          )}
          {project.repo_url && (
            <span className="text-sm text-primary hover:underline">
              {sourceLabel}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
