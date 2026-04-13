import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "**.xhscdn.com" },
      { hostname: "**.baidu.com" },
      { hostname: "**.supabase.co" },
    ],
  },
};

export default withNextIntl(nextConfig);
