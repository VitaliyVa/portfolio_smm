import type { NextConfig } from "next";

const basePath = "/portfolio_smm";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
