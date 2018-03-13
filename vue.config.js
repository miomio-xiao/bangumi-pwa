module.exports = {
  devServer: {
    port: '8086',
    proxy: {
      '^/api': {
        target: 'https://api.bgm.tv',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '^/bgmtools': {
        target: 'https://windrises.net',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false,
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      importWorkboxFrom: 'local',
      swDest: './service-worker.js',
      cacheId: 'bangumi',
      globDirectory: 'dist',
      globPatterns: ['*/*.{html,js,css,eot,svg,ttf,woff}'],
      globIgnores: ['**/*.map'],
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /api/,
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 10,
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 7
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('http://lain.bgm.tv/pic/(.*)'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 10,
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60
            },
            cacheableResponse: { statuses: [0, 200, 503] }
          }
        }
      ]
    }
  }
};
