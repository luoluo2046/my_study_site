export { createSupabaseClient } from "./client";
export type { Database, Project, SiteConfig } from "./types";
export { getPublishedProjects, getAllProjects, getProjectById, upsertProject, deleteProject, searchProjects } from "./projects";
export { getConfig, setConfig } from "./site-config";
