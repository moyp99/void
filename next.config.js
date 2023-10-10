/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.valorant-api.com", "loremflickr.com", "cloudflare-ipfs.com"]
  }
}

module.exports = nextConfig
