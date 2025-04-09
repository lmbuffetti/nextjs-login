/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: [
    'react-syntax-highlighter',
  ],
}

module.exports = nextConfig
