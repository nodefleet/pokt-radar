/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
