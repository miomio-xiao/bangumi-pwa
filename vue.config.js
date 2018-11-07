module.exports = {
  devServer: {
    port: '8086',
    proxy: {
      '^/api': {
        target: 'http://localhost:7001',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false,
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      importWorkboxFrom: 'local',
      cacheId: 'bangumi',
      globDirectory: 'dist',
      globPatterns: ['*/*.{html,js,css,eot,svg,ttf,woff}'],
      globIgnores: ['**/*.map'],
      clientsClaim: true,
      skipWaiting: true,
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      runtimeCaching: [{
        urlPattern: /api/,
        handler: 'networkFirst',
        options: {
          networkTimeoutSeconds: 10,
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }]
    }
  }
};