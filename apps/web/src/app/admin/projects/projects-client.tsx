"use client";

import { useState, useTransition } from "react";
import type { Project } from "@my-site/db";
import { saveProject, removeProject } from "./actions";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSave(formData: FormData) {
    startTransition(async () => {
      await saveProject(formData);
      // 刷新页面以获取最新数据
      window.location.reload();
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("确定要删除这个项目吗？")) return;

    startTransition(async () => {
      await removeProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    });
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    // 滚动到表单
    document.getElementById("project-form")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleCancel() {
    setEditingProject(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">作品集管理</h1>

      {/* 项目列表 */}
      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3">项目名称</th>
              <th className="px-4 py-3">状态</th>
              <th className="px-4 py-3">排序</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3">
                  {project.published ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      已发布
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      草稿
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{project.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-sm text-primary hover:underline"
                      disabled={isPending}
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-sm text-destructive hover:underline"
                      disabled={isPending}
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 编辑/新增表单 */}
      <div id="project-form" className="mt-10">
        <h2 className="text-xl font-semibold">
          {editingProject ? "编辑项目" : "新增项目"}
        </h2>
        <form action={handleSave} className="mt-6 space-y-4 rounded-lg border border-border bg-card p-6">
          {editingProject && <input type="hidden" name="id" value={editingProject.id} />}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">项目名称（中文）*</label>
              <input
                name="title"
                defaultValue={editingProject?.title || ""}
                placeholder="项目名称（中文）"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">项目名称（英文）</label>
              <input
                name="title_en"
                defaultValue={editingProject?.title_en || ""}
                placeholder="项目名称（英文，可选）"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">项目描述（中文）*</label>
            <textarea
              name="description"
              defaultValue={editingProject?.description || ""}
              placeholder="项目描述（中文）"
              required
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">项目描述（英文）</label>
            <textarea
              name="description_en"
              defaultValue={editingProject?.description_en || ""}
              placeholder="项目描述（英文，可选）"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">封面图 URL</label>
              <input
                name="cover_url"
                defaultValue={editingProject?.cover_url || ""}
                placeholder="封面图 URL"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Demo URL</label>
              <input
                name="demo_url"
                defaultValue={editingProject?.demo_url || ""}
                placeholder="Demo URL"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">GitHub URL</label>
            <input
              name="repo_url"
              defaultValue={editingProject?.repo_url || ""}
              placeholder="GitHub URL"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">技术栈（逗号分隔）</label>
            <input
              name="tech_stack"
              defaultValue={editingProject?.tech_stack.join(", ") || ""}
              placeholder="React, TypeScript, Next.js"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="text-sm font-medium">排序</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={editingProject?.sort_order ?? 0}
                className="mt-1 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                name="published"
                type="checkbox"
                defaultChecked={editingProject?.published ?? false}
              />
              发布到前台
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isPending ? "保存中..." : editingProject ? "更新项目" : "保存项目"}
            </button>
            {editingProject && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
              >
                取消
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
