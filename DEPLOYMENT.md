# Vercel 部署指南

## 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 构建设置

- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && pnpm install && pnpm turbo run build --filter=web`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

## 部署步骤

1. 连接 GitHub 仓库到 Vercel
2. 选择 `apps/web` 作为项目根目录
3. 配置环境变量
4. 部署

每次推送到 `main` 分支会自动触发部署。
