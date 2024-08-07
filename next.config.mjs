/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'www.hotavatars.com' },
      { hostname: 'example2.com' },
      { hostname: 'ipfs.filebase.io' },
      { hostname: 'ipfs.io' },
      { hostname: 'api.qrserver.com' }
    ]
  }
};

export default nextConfig;
