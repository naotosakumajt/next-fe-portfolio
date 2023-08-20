/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
};

module.exports = {
  ...nextConfig,
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
};
