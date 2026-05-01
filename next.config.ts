import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: '/Users/bichou/Documents/Dev/Projets Dev/3D/Projets/my-app',
  },
};

export default nextConfig;