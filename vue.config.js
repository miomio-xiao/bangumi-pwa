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
      // swSrc: 'dist/service-worker.js',
      swDest: './service-worker.js',
      importWorkboxFrom: 'local',
      cacheId: 'bangumi',
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js,css,eot,svg,ttf,woff}'],
      globIgnores: ['service-worker.js', '**/*.map'],
      include: [/\.jpg$/, /\.png$/],
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
              // headers: { 'x-test': 'true' }
            }
          }
        }
      ]
    }
  }
};
