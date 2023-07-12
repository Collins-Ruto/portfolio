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
    dangerouslyAllowSVG: true,
    domains: [
      "img.icons8.com",
      "cdn-icons-png.flaticon.com",
      "preschool.dreamguystech.com",
      "icons-for-free.com",
      "i.ytimg.com",
      "github.com",
      "res.cloudinary.com",
      "dev.to",
      "img.shields.io",
      "github-readme-stats.vercel.app",
      "visitor-badge.glitch.me",
      "wakatime.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: "asset/source",
    });
    return config;
  },
};
export default nextConfig;

// {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'unsafe-inline' 'self' https://collinsruto.vercel.app"
//           },
//         ],
//       },