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

export async function upsertProject(
  client: Client,
  project: Database["public"]["Tables"]["projects"]["Insert"] & { id?: string }
): Promise<Project> {
  const { data, error } = await client
    .from("projects")
    .upsert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(client: Client, id: string): Promise<void> {
  const { error } = await client.from("projects").delete().eq("id", id);
  if (error) throw error;
}
