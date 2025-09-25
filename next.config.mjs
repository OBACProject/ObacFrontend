/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	env: {
		NEXT_PUBLIC_API_URL_V1: process.env.NEXT_PUBLIC_API_URL_V1,
		NEXT_PUBLIC_API_URL_V2: process.env.NEXT_PUBLIC_API_URL_V2,
		NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
	},
};

export default nextConfig;
