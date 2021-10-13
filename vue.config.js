const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // publicPath: '/',
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
  },
  devServer: {
    open: true,
    hot: true
  },
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
