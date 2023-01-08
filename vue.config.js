const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: "src/preload.js",
      builderOptions: {
        win: {
          icon: "./public/favicon.ico",
          target: [
            {
              target: "nsis",//利用nsis制作安装程序
              arch: [
                "x64",//64位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "./public/favicon.ico",// 安装图标
          uninstallerIcon: "./public/favicon.ico",//卸载图标
          installerHeaderIcon: "./public/favicon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true,// 创建开始菜单图标
          shortcutName: "favicon", // 图标名称
        }
      }
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
        target: 'http://127.0.0.1:3200', //这里填入你要请求的接口的前缀
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