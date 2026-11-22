/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Cho phép mobile build tĩnh ngay cả khi dynamic API routes không statically export được
  },
  env: {
    NEXT_PUBLIC_IS_MOBILE_APP: 'true',
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
