/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.timbu.cloud',
            port: '',
            pathname: '/images/',
          },
          {
            protocol: 'https',
            hostname: 'lottie.host',
            port: '',
            pathname: '/328ab1a7-0933-4669-a44a-acd5ba44a91c/',
          },
        ],
    },
};

export default nextConfig;
