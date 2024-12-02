/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: [
    'react-syntax-highlighter',
    'swagger-client',
    'swagger-ui-react',
  ],
  serverExternalPackages: ['mongoose', '@typegoose/typegoose'],
}

module.exports = nextConfig
