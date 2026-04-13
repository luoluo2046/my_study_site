export { createSupabaseClient } from "./client";
export type { Database, Project, SiteConfig } from "./types";
export { getPublishedProjects, getAllProjects, upsertProject, deleteProject } from "./projects";
export { getConfig, setConfig } from "./site-config";
