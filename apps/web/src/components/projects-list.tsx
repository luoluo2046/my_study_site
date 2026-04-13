"use client";

import { useState, useEffect, useRef } from "react";
import type { Project } from "@my-site/db";
import { ProjectCard } from "./project-card";

interface ProjectsListProps {
  projects: Project[];
  locale: string;
  demoLabel: string;
  sourceLabel: string;
  searchPlaceholder: string;
  emptyText: string;
  noResultsText: string;
}

export function ProjectsList({
  projects,
  locale,
  demoLabel,
  sourceLabel,
  searchPlaceholder,
  emptyText,
  noResultsText,
}: ProjectsListProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!search.trim()) {
      setResults(null);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/projects/search?q=${encodeURIComponent(search.trim())}`
        );
        const data = await res.json();
        setResults(data.projects);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [search]);

  const displayProjects = results ?? projects;

  if (projects.length === 0 && !search.trim()) {
    return <p className="mt-12 text-center text-muted-foreground">{emptyText}</p>;
  }

  return (
    <>
      <div className="mt-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full max-w-md rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {loading ? (
        <p className="mt-12 text-center text-muted-foreground">搜索中...</p>
      ) : displayProjects.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{noResultsText}</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              demoLabel={demoLabel}
              sourceLabel={sourceLabel}
            />
          ))}
        </div>
      )}
    </>
  );
}
