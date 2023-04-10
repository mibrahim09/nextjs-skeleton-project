/** @type {import('next').NextConfig} */
function getCSPConfigurations() {
    switch (process.env.NEXT_PUBLIC_BUILD_ENV) {
        case 'staging':
            return [{
                key: 'Content-Security-Policy',
                value: "default-src 'self'; image-src 'https://nawy-shares.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
            }];
        case 'production':
            return [{
                key: 'Content-Security-Policy',
                value: "default-src 'self'; image-src 'https://nawy-shares.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
            }];
        default:
            return [];
    }
}

const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
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
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    ...getCSPConfigurations(),
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
