/** @type {import('next').NextConfig} */
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  connect-src * ws: wss:;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: *.ytimg.com;
  frame-src https://www.youtube.com;
  worker-src https://www.youtube.com;
`

const headers = async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Content-Security-Policy',
          value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        /* {
          key: 'Permissions-Policy',
          value: 'ch-ua-form-factor("https://www.youtube.com")'
        } */
      ]
    }
  ]
}

const nextConfig = {
  headers: headers
}

module.exports = nextConfig
