/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.201.137.93:5000/api/:path*'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint:{
    ignoreDuringBuilds: true
  },
  typescript:{
    ignoreBuildErrors: true
  }
};

export default nextConfig;
