const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        data: `@import "@/styles/index.scss";`
      }
    }
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   }
  // },
  devServer: {
    proxy: {
      '/api': {
          target: 'http://192.168.110.4',
          changeOrigin: true,
      },
    }
  }
}
