import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true, // Required for static export; images served as-is
  },
  // Aggressive tree-shaking for heavy packages
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'gsap',
      'gsap/trial',
      'lucide-react',
    ],
  },
};

export default nextConfig;
