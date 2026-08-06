import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "pmporvezbqlaletwpdgf.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig as any);