import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}
const supabaseHostname = new URL(supabaseUrl).hostname;

const svgrOptions = {
  icon: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: { removeViewBox: false },
        },
      },
      "removeDimensions",
    ],
  },
};

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: svgrOptions }],
    });
    return config;
  },
  cacheComponents: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: svgrOptions }],
        as: "*.js",
      },
    },
  },

  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
      },
    ],
  },
};

export default nextConfig;
