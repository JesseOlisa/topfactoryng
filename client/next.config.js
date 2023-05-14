/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// experimental: {
	// 	scrollRestoration: true,
	// },
	images: {
		domains: ['cdn.sanity.io'],
	},
};

module.exports = nextConfig;
