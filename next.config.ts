import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ['127.0.0.1', 'localhost', '172.30.96.1'],
};
export default config;
