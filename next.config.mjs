// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  disable: false, // Enable PWA in development mode
});

const config = {
  // Additional Next.js config options
};

export default withPWA(config);
