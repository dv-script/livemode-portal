/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'access.bundesliga.com',
      port: ''
    }, {
      protocol: 'https',
      hostname: 'frontendapiapp.blob.core.windows.net',
      port: ''
    }]
  }
}

module.exports = nextConfig