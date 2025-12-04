import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    cssChunking: true,
    turbo: {
      rules: {},
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
