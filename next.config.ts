import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   
    bodyParser: {
      sizeLimit: "10mb", // increase limit
    },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
