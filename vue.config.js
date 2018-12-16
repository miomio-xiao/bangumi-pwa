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
    workboxOptions: {
      importWorkboxFrom: 'local',
      cacheId: 'bangumi',
      globDirectory: 'dist',
      globPatterns: [
        '*/*.{html,js,css,eot,svg,ttf,woff}'
      ],
      globIgnores: [
        '**/*.map'
      ],
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
            maxAgeSeconds: 604800
          },
          cacheableResponse: {
            statuses: [
              0,
              200
            ]
          }
        }
      }]
    },
    name: 'bangumi',
    themeColor: '#f73e53'
  }
};