/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      middleware: true,
      missingSuspenseWithCSRBailout: false,
    },
  };
  
  export default nextConfig;
  