/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    const scriptCSP = ['script-src', "'self'"];

    if (process.env.NODE_ENV === "development") {
      scriptCSP.push("'unsafe-eval'");
    };

    return [{
      source: "/:path",
      headers: [{
        key: "Content-Security-Policy",
        value: [
          ['default-src', "'self'"],
          scriptCSP,
          ['style-src', "'self'"],
          ['connect-src', "'self'"],
          ['img-src', "'self'"],
          ['base-uri',  "'self'"],
          ['form-action', "'self'"],
          ['font-src', "'self'"],
          ['object-src', "'none'"],
          ['frame-ancestors', "'none'"],
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