/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  optimization: {
    minimize: false,
  },
  swcMinify: false,
};

module.exports = nextConfig;
