import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/green_coffee', // Remove or comment this out
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
