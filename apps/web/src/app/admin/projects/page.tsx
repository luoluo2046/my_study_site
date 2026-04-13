import { createServerClient } from "@/lib/supabase/server";
import { getAllProjects } from "@my-site/db";
import { ProjectsClient } from "./projects-client";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = createServerClient();
  const projects = await getAllProjects(supabase);

  return <ProjectsClient initialProjects={projects} />;
}
