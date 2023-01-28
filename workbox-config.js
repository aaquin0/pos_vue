module.exports = {
    globDirectory: 'dist',
    globPatterns: ['**/*.{html,js,css}'],
    swDest: 'dist/sw.js',
    clientsClaim: true,
    skipWaiting: true,
    additionalManifestEntries: ['precache-manifest.js'],
    importScripts: ['precache-manifest.js'],
    runtimeCaching: [
        {
            urlPattern: new RegExp('^http://'),
            handler: 'NetworkFirst',
            options: {
                cacheName: 'offlineCache',
                expiration: {
                    maxEntries: 20
                }
            }
        }
    ]
};
