import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
