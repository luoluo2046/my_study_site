import { createServerClient } from "@/lib/supabase/server";
import { saveConfig } from "./actions";
import type { SiteConfig } from "@my-site/db";

export const dynamic = "force-dynamic";

export default async function AdminConfigPage() {
  const supabase = createServerClient();
  const { data: configs } = await supabase
    .from("site_config")
    .select("*")
    .order("key")
    .returns<SiteConfig[]>();

  return (
    <div>
      <h1 className="text-2xl font-bold">站点配置</h1>

      <form
        action={saveConfig}
        className="mt-6 space-y-3 rounded-lg border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold">添加/更新配置</h2>
        <input name="key" placeholder="配置键（如: about, social_links）" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <textarea name="value" placeholder='配置值（JSON 格式）' required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" rows={5} />
        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          保存
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {configs?.map((config) => (
          <div key={config.id} className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-mono font-medium">{config.key}</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
              {JSON.stringify(config.value, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
