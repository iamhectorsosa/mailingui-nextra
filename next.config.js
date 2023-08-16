/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/guide/introduction",
        permanent: true,
      },
      {
        source: "/docs/guide",
        destination: "/docs/guide/introduction",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/overview",
        permanent: true,
      },
    ];
  },
};

/** @type {import('nextra').NextraConfig} */
const nextraConfig = {
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
};

const withNextra = require("nextra")(nextraConfig);

module.exports = withNextra(nextConfig);
