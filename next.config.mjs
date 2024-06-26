/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true }
};

// next.config.js
import withVideos from 'next-videos';

export default withVideos();
