import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Enable default Turbopack configuration (no custom webpack overrides needed)
  turbopack: {},
};

export default nextConfig;
