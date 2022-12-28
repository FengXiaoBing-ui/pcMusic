const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  css: {
    loaderOptions:{
      scss:{
        prependData:`@import "@/assets/css/index.scss"; @import "@/assets/css/_handle.scss";`
      },
      sass:{
        prependData:`@import "@/assets/css/index.scss"; @import "@/assets/css/_handle.scss";`
      }
    }
  }
})