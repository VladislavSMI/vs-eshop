import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ['app', 'components', 'data', 'i18n', 'lib', 'styles', 'use-cases'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vs-eshop.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
