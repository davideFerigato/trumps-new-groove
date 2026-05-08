import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/db", "@repo/api", "@repo/config", "@repo/emails"],
};

export default nextConfig;