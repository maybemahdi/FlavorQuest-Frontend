// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//       {
//         protocol: "http", // Allow HTTP protocol for localhost
//         hostname: "localhost",
//         port: "5000", // Specify the port your local server is running on
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
  // HTTPS configuration for local development
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
    },
  },
};

export default nextConfig;
