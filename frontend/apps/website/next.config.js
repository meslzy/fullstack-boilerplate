/**
 * @type {import("next").NextConfig}
 **/
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src"],
  },
  transpilePackages: [
    "@libs/utils",
  ],
};

export default nextConfig;
