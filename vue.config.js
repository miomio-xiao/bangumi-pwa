module.exports = {
  devServer: {
    port: '8086',
    proxy: {
      '/api': {
        target: 'http://api.bgm.tv',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false
};
