import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  images: {
    qualities: [100, 85, 70],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/*/hqdefault.jpg",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
    ],
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  experimental: {
    optimizePackageImports: [
      "embla-carousel",
      "embla-carousel-autoplay",
      "embla-carousel-react",
    ],
  },
};

export default nextConfig;
// lh3.googleusercontent.com
