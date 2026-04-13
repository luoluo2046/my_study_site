import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, SiteConfig } from "./types";

type Client = SupabaseClient<Database>;

export async function getConfig(client: Client, key: string): Promise<SiteConfig | null> {
  const { data, error } = await client
    .from("site_config")
    .select("*")
    .eq("key", key)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function setConfig(
  client: Client,
  key: string,
  value: Record<string, unknown>
): Promise<SiteConfig> {
  const { data, error } = await client
    .from("site_config")
    .upsert({ key, value } as never, { onConflict: "key" })
    .select()
    .single();

  if (error) throw error;
  return data as unknown as SiteConfig;
}
