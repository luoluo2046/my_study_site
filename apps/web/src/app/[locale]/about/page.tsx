import { useTranslations } from "next-intl";

const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"];
const backendSkills = ["Node.js", "Express", "PostgreSQL", "Supabase", "REST API"];
const toolSkills = ["Git", "Docker", "Vercel", "GitHub Actions", "VS Code"];

const contacts = [
  { label: "GitHub", href: "https://github.com/luoluo2046", icon: "GH" },
  { label: "Email", href: "mailto:18715098524@163.com", icon: "@" },
];

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
      {name}
    </span>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      {/* 个人简介 */}
      <div className="mt-8 space-y-4 leading-7">
        <p className="text-lg">{t("intro")}</p>
        <p className="text-muted-foreground">{t("introDetail")}</p>
      </div>

      {/* 技术栈 */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("skillsTitle")}</h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("frontend")}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {frontendSkills.map((s) => <SkillBadge key={s} name={s} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("backend")}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {backendSkills.map((s) => <SkillBadge key={s} name={s} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("tools")}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {toolSkills.map((s) => <SkillBadge key={s} name={s} />)}
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t("contactTitle")}</h2>
        <p className="mt-2 text-muted-foreground">{t("contactDesc")}</p>
        <div className="mt-4 flex gap-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                {c.icon}
              </span>
              {c.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
