import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "developer.nytimes.com",
        port: '',
        pathname: '/files/poweredby_nytimes_200c.png',
        search: ''
      }
    ]
  }
};

export default nextConfig;
