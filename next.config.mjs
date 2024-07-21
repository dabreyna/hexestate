/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    trailingSlash: true,
    redirects: async () => [
        {
            source: '/',
            destination: '/web',
            permanent: true,
        },
        {
            source: '/sistema',
            destination: '/private/login/',
            permanent: true,
        }
    ],
};

export default nextConfig;
