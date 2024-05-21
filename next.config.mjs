/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["localhost", "source.unsplash.com"],
  },
  plugins: ["tailwindcss", "autoprefixer"],
};

module.export = nextConfig;
