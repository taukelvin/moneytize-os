import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  serverExternalPackages: [
    "@sparticuz/chromium",
  ],

  turbopack: {
    root: __dirname,
  },

};

export default nextConfig;