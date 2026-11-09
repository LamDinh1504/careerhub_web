import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is required");
}
let serverOrigin = "";
if (!apiUrl.startsWith("http")) {
  throw new Error("NEXT_PUBLIC_API_URL must be an absolute URL");
}
serverOrigin = new URL(apiUrl).origin;

nextConfig.rewrites = async () => {
  return [
    {
      source: "/uploads/:path*",
      destination: `${serverOrigin}/uploads/:path*`,
    },
  ];
};

export default nextConfig;