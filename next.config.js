/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  transpilePackages: [
    'react-syntax-highlighter',
    'swagger-client',
    'swagger-ui-react',
  ],
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
  },
}

module.exports = nextConfig
