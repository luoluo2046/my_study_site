import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <div className="mt-8 space-y-4 text-muted-foreground leading-7">
        <p>
          这里是关于我的页面内容。你可以通过管理后台的站点配置来修改这些内容，
          或者直接编辑此文件添加更丰富的自我介绍。
        </p>
      </div>
    </div>
  );
}
