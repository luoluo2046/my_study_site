# 个人网站全栈平台设计文档

## 概述

基于 Monorepo 架构的个人网站全栈项目，以学习全栈技术栈为目标，同时构建一个可扩展的平台。第一阶段交付：个人主页 + 博客 + 作品集 + 关于我。

## 核心决策

| 维度 | 决策 |
|------|------|
| 核心功能 | 首页 + 博客 + 作品集 + 关于我 |
| 内容管理 | 混合：技术文章 Markdown，其他内容 Supabase |
| 用户系统 | 无，纯展示型，仅管理员 |
| 部署 | GitHub Actions CI/CD → Vercel |
| 视觉风格 | 温暖柔和 + Light/Dark 切换，预留多主题扩展 |
| 管理后台 | 集成到 Next.js `/admin` 路由 |
| 国际化 | 中英双语，按文章灵活选择语言 |
| Vite | 当前不用，未来加独立 app 时启用 |

## 1. Monorepo 结构

```
my-site/
├── apps/
│   └── web/                    # Next.js 15 (App Router)
│       ├── src/
│       │   ├── app/
│       │   │   ├── [locale]/           # i18n 前台路由
│       │   │   │   ├── page.tsx           # 首页
│       │   │   │   ├── blog/
│       │   │   │   ├── projects/
│       │   │   │   └── about/
│       │   │   ├── admin/              # 管理后台（不走 i18n，固定中文）
│       │   │   │   ├── page.tsx
│       │   │   │   ├── projects/
│       │   │   │   └── config/
│       │   │   └── layout.tsx
│       │   ├── components/
│       │   ├── content/
│       │   │   ├── zh/
│       │   │   └── en/
│       │   ├── lib/
│       │   └── messages/
│       │       ├── zh.json
│       │       └── en.json
│       └── public/
├── packages/
│   ├── ui/                     # 共享 UI 组件（基于 shadcn）
│   ├── db/                     # Supabase client + 类型 + 查询封装
│   └── config/                 # 共享 Tailwind/ESLint/TS 配置
├── .github/
│   └── workflows/
│       └── ci.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 2. 技术选型

| 技术 | 版本 | 用途 |
|------|------|------|
| pnpm | 9.x | 包管理 + workspace |
| Turborepo | latest | Monorepo 构建编排 |
| Next.js | 15 | 主应用框架 (App Router) |
| React | 19 | UI 层 |
| Tailwind CSS | 4 | 样式，CSS 变量驱动主题 |
| shadcn/ui | latest | 组件库，代码复制到 packages/ui |
| Supabase | latest | PostgreSQL + Auth + Storage |
| next-intl | latest | i18n (App Router) |
| contentlayer2 | latest | MDX 编译解析 |
| next-themes | latest | Light/Dark 主题切换 |

## 3. 数据模型

### Supabase 表结构

```sql
-- 作品集
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  cover_url TEXT,
  demo_url TEXT,
  repo_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 站点配置
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 内容流

- **Markdown 文章**：`.mdx` 文件 → contentlayer2 编译 → 类型安全 JSON → Server Component 消费
- **动态内容**：Supabase PostgreSQL → packages/db 查询封装 → Server Component 读取 → /admin Server Actions 写入
- **图片/附件**：Supabase Storage → CDN URL 引用

## 4. 管理员认证

- Supabase Auth 邮箱密码登录，仅一个管理员账号
- `/admin` 路由组通过 middleware 校验 session
- 未登录重定向到登录页
- 不对外暴露注册入口

## 5. 路由设计

```
/[locale]/                → 首页
/[locale]/blog            → 博客列表
/[locale]/blog/[slug]     → 博客详情
/[locale]/projects        → 作品集
/[locale]/about           → 关于我
/admin                    → 管理后台（不走 i18n，固定中文）
/admin/projects           → 管理作品集
/admin/config             → 管理站点配置
```

## 6. i18n 方案

- URL 结构：`/zh/...` 和 `/en/...`
- UI 文案：`messages/zh.json` + `messages/en.json`，通过 next-intl 加载
- 博客内容：按语言分目录 `content/zh/` + `content/en/`，同 slug 关联
- 某篇文章只有一种语言时，另一语言页面不显示该文章
- middleware 检测浏览器语言自动重定向

## 7. 主题系统

- Tailwind CSS 4 CSS 变量定义色板（`--color-primary` 等）
- next-themes 管理 Light/Dark 状态
- 温暖柔和风格为默认主题
- 预留多主题扩展：未来加新主题只需新增一套 CSS 变量

## 8. CI/CD 与部署

### GitHub Actions Pipeline

```yaml
on: push to main / pull_request

jobs:
  ci:
    steps:
      - pnpm install
      - turbo run lint      # 并行
      - turbo run check     # 并行
      - turbo run build     # 并行
```

### 部署策略

- **main 分支**：push 触发 Vercel Production 部署
- **dev 分支**：push 触发 CI + Vercel Preview
- **feature 分支**：PR 触发 CI + Vercel Preview

### 职责划分

- GitHub Actions：质量门禁（lint、type check、build）
- Vercel：实际部署（通过 GitHub App 集成）

### 环境变量

- Supabase URL / Key → GitHub Secrets + Vercel Environment Variables
- 本地开发：`.env.local`（gitignore）

### Vercel 配置

- Root Directory：`apps/web`
- Build Command：`cd ../.. && pnpm turbo run build --filter=web`
