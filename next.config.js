module.exports = {
    images: {
        domains: ['cravatar.eu']
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en'
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./scripts/sitemap-generator');
        }
        return config;
    },
    redirects() {
        return [
            {
                source: '/discord',
                destination: 'https://discord.gg/ASB67acx2Y',
                permanent: true
            }
        ]
    }
}