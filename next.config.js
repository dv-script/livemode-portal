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
    },
    {
      protocol: 'https',
      hostname: 'e4q1hopwqwlwbvmx.public.blob.vercel-storage.com',
      port: ''
    }]
  }
}

module.exports = nextConfig