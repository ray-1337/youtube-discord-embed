/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: "/",
        destination: "https://github.com/ray-1337/youtube-discord-embed/",
        permanent: true
      },
      {
        source: "/shorts/:ytID",
        destination: "/watch?v=:ytID",
        permanent: false
      }
    ]
  },

  async headers() {
    return [{
      source: "/:path",
      headers: [{
        key: "Content-Security-Policy",
        value: [
          ['default-src', "'none'"].concat(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
          ['script-src', "'self'"],
          ['block-all-mixed-content'],
          ['upgrade-insecure-requests']
        ]
        .reduce((prev, [directive, ...policy]) => {
          return `${prev}${directive} ${policy.filter(Boolean).join(' ')};`
        }, '')
      }]
    }]
  }
};

module.exports = nextConfig