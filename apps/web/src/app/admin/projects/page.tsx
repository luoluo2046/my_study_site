import { createServerClient } from "@/lib/supabase/server";
import { getAllProjects } from "@my-site/db";
import { saveProject, removeProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = createServerClient();
  const projects = await getAllProjects(supabase);

  return (
    <div>
      <h1 className="text-2xl font-bold">作品集管理</h1>

      <form
        action={saveProject}
        className="mt-6 space-y-3 rounded-lg border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold">添加项目</h2>
        <input name="title" placeholder="项目名称（中文）" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input name="title_en" placeholder="项目名称（英文，可选）" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <textarea name="description" placeholder="项目描述（中文）" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={3} />
        <textarea name="description_en" placeholder="项目描述（英文，可选）" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={3} />
        <input name="cover_url" placeholder="封面图 URL" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input name="demo_url" placeholder="Demo URL" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input name="repo_url" placeholder="GitHub URL" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input name="tech_stack" placeholder="技术栈（逗号分隔）" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input name="sort_order" type="number" placeholder="排序" defaultValue={0} className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm">
          <input name="published" type="checkbox" /> 发布
        </label>
        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          保存
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.published ? "已发布" : "草稿"} · 排序: {project.sort_order}
              </p>
            </div>
            <form action={removeProject.bind(null, project.id)}>
              <button type="submit" className="rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90">
                删除
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
