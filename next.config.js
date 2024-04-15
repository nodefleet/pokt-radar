/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  swcMinify: false,
  headers: () => [
    {
      source: "/",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
