"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { upsertProject, deleteProject } from "@my-site/db";

export async function saveProject(formData: FormData) {
  const supabase = createServerClient();

  const project = {
    id: (formData.get("id") as string) || undefined,
    title: formData.get("title") as string,
    title_en: (formData.get("title_en") as string) || null,
    description: formData.get("description") as string,
    description_en: (formData.get("description_en") as string) || null,
    cover_url: (formData.get("cover_url") as string) || null,
    demo_url: (formData.get("demo_url") as string) || null,
    repo_url: (formData.get("repo_url") as string) || null,
    tech_stack: (formData.get("tech_stack") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    published: formData.get("published") === "on",
  };

  await upsertProject(supabase, project);
  revalidatePath("/admin/projects");
}

export async function removeProject(id: string) {
  const supabase = createServerClient();
  await deleteProject(supabase, id);
  revalidatePath("/admin/projects");
}
