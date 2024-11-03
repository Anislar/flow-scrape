/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactRoot: true,
    appDir: true, // Only if using the app directory
  },
  reactStrictMode: true,
};

export default nextConfig;
