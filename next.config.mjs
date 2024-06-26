/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    remotePatterns: ['']
  }
};

// next.config.js
import withVideos from 'next-videos';

export default withVideos();
