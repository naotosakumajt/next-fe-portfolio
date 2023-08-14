/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
};

module.exports = {
  ...nextConfig,
  env: {
    API_KEY: process.env.API_KEY,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
};
