"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { setConfig } from "@my-site/db";

export async function saveConfig(formData: FormData) {
  const supabase = createServerClient();
  const key = formData.get("key") as string;
  const value = JSON.parse(formData.get("value") as string);
  await setConfig(supabase, key, value);
  revalidatePath("/admin/config");
}
