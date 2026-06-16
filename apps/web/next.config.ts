import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ["@repo/db", "@repo/api", "@repo/config", "@repo/emails"],
};

export default nextConfig;