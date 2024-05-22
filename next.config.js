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

module.exports = () => {
  // require("dotenv").config();
  return nextConfig;
};
