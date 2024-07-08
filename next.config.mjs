/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'ipfs.filebase.io', port: '', pathname: '/products/**' }]
  }
};
