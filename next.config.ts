import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.4"],
  outputFileTracingRoot: process.cwd()
};

export default nextConfig;
