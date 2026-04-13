import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Project } from "./types";

type Client = SupabaseClient<Database>;

export async function getPublishedProjects(client: Client): Promise<Project[]> {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getAllProjects(client: Client): Promise<Project[]> {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getProjectById(
  client: Client,
  id: string
): Promise<Project | null> {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw error;
  }
  return data;
}

export async function upsertProject(
  client: Client,
  project: Record<string, unknown>
): Promise<Project> {
  const { data, error } = await client
    .from("projects")
    .upsert(project as never)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Project;
}

export async function searchProjects(
  client: Client,
  query: string
): Promise<Project[]> {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("published", true)
    .or(
      `title.ilike.%${query}%,title_en.ilike.%${query}%,description.ilike.%${query}%,description_en.ilike.%${query}%`
    )
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function deleteProject(client: Client, id: string): Promise<void> {
  const { error } = await client.from("projects").delete().eq("id", id);
  if (error) throw error;
}
