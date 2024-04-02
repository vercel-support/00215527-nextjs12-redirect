const path = require("path")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const rewrites = async () => [
  /*
  * Site Map
  */

  /*
  * Translations (rest)
  */
  { source: "/:lang(de-DE)/produkt/:productSlug", destination: "/:lang/product/:productSlug" },
  { source: "/storybook/", destination: "/storybook/index.html" },
]


module.exports = withBundleAnalyzer({
  // pageExtensions: ["tsx"],
  trailingSlash: true,
  // env,
  // distDir: "build",
  swcMinify: true,
  rewrites,
  async redirects() {
    return [
      {
        source: '/company/:slug',
        destination: '/about/:slug',
        permanent: true,
      },
      {
        source: '/company/io-hub/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/page-sitemap/",
        headers: [
          {
            key: "Content-Type",
            value: "text/xml; charset=utf-8",
          },
        ],
      },
      {
        source: "/public/fonts/heebo.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3153600, immutable",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=3153600",
          },
        ],
      },
    ]
  },
  webpack(config, { isServer }) {
    /* eslint no-param-reassign: "error" */
    config.resolve.alias["@"] = path.join(__dirname, "src")
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        stream: false,
      }
    }
    if (process.env.ANALYZE === "true" && !isServer) {
      config.plugins.push(
        new StatsWriterPlugin({
          filename: "../webpack-stats.json",
          stats: {
            assets: true,
            chunks: true,
            chunkModules: true,
            modules: true,
          },
        }),
      )
    }
    return config
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: ["images.ctfassets.net", "pandora-cpd.imgix.net", "cdn.onlogic.com"],
    unoptimized: true,
  },
  i18n: {
    locales: [
      "de",
      "en-US",
      "eu", // en-EU
      "nl",
      "be-nl", // nl-BE
      "uk", // en-GB
    ],
    defaultLocale: "en-US",
  },
  compiler: {
    styledComponents: true,
  },
})