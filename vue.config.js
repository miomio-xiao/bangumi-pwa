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
  lintOnSave: false
};
