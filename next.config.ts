import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   api: {
    bodyParser: {
      sizeLimit: "20mb", // increase limit
    },
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
