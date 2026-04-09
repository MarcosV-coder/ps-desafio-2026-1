/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_API_DOMAIN, 'via.placeholder.com', 'loremflickr.com', 'images.unsplash.com'],
  },
}

export default nextConfig
