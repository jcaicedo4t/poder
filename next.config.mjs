/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      middleware: false,
      missingSuspenseWithCSRBailout: false,
    },
  };
  
  export default nextConfig;
  