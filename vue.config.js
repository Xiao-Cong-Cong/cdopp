module.exports = {
    lintOnSave: true,
   
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      }
    }
  }