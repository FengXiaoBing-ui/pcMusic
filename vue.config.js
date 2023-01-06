const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  devServer: {
    port: 80,
    allowedHosts: [
      'www.jixueit.cn', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.www.jixueit.cn'   // .是二级域名的通配符   
    ],
    proxy: {

      '/api': {
        target: 'http://192.168.2.185:3300', //这里填入你要请求的接口的前缀
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更换origin
        secure: true, //是否https接口，我用的http但是我变成false他打包后会报错，所以先true
        pathRewrite: {
          '^/api': ''     //重写路径
        }

      }

    },
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/css/index.scss"; @import "@/assets/css/_handle.scss";`
      },
      sass: {
        prependData: `@import "@/assets/css/index.scss"; @import "@/assets/css/_handle.scss";`
      }
    }
  }
})