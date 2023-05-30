/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
  images: {
    domains: [
      "img.icons8.com",
      "cdn-icons-png.flaticon.com",
      "preschool.dreamguystech.com",
      "icons-for-free.com",
      "i.ytimg.com"
    ],
  },
};
export default nextConfig;
