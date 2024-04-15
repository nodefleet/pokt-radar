/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  swcMinify: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
