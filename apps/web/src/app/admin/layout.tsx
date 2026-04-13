import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-border bg-card p-4">
        <h2 className="text-lg font-bold text-primary mb-6">管理后台</h2>
        <nav className="space-y-2 text-sm">
          <Link
            href="/admin"
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            仪表盘
          </Link>
          <Link
            href="/admin/projects"
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            作品集管理
          </Link>
          <Link
            href="/admin/config"
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            站点配置
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
