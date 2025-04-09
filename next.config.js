/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  transpilePackages: [
    'react-syntax-highlighter',
  ],
}

module.exports = nextConfig
