/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This ensures the API routes have access to environment variables
  serverRuntimeConfig: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    COHERE_API_KEY: process.env.COHERE_API_KEY,
  },
}

export default nextConfig
