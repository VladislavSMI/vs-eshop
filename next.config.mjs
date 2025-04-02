import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vs-eshop.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
