import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'img.clerk.com' },
      {
        protocol: 'https',
        hostname: 'ogqxbog6vhc1huym.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
