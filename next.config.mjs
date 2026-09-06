/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // "standalone" produces a self-contained server bundle in .next/standalone,
  // which is what the production Dockerfile copies and runs — no need to
  // ship node_modules or the full source into the final image.
  output: "standalone",
};

export default nextConfig;
