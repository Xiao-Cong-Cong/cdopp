const webpack = require('webpack')

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
    },

    configureWebpack: {    
      plugins: [      
        new webpack.ProvidePlugin({        
          $: 'jquery',        
          jQuery: 'jquery',        
          'windows.jQuery': 'jquery',
          Popper: ['popper.js', 'default']     
        })    
      ]  
    }
  }