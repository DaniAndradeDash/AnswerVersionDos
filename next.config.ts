import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // 🔴 Desactiva el optimizador
  },
};


export default nextConfig;
