'use strict'

import { app, protocol, BrowserWindow, Notification, Menu, ipcMain, Tray, screen, nativeImage, session } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path')
let tray = null;
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let iconPath = path.join(__dirname, `${process.env.WEBPACK_DEV_SERVER_URL ? 'bundled/favicon.ico' : 'favicon.ico'}`)

const menu = Menu.buildFromTemplate([])
Menu.setApplicationMenu(menu)

// 创建窗口的函数
let win = null, win2 = null,win3 = null;
async function createLoginWindow() {
  win3 = new BrowserWindow({
    width: 400, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
    height: 600, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
    type: 'toolbar',  //创建的窗口类型为工具栏窗口
    frame: false,  //要创建无边框窗口
    resizable: false, //禁止窗口大小缩放
    show: false,  //先不让窗口显示
    transparent: false, //设置透明
    hasShadow: true, //不显示阴影
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前\
    // backgroundColor: rgba(255,255,255,0),
    webPreferences: {
      nodeIntegration: true,    // 是否集成 Nodejs
      enableRemoteModule: true,
      webSecurity: false,
      contextIsolation: false
    }
  })
  //通过获取用户屏幕的宽高来设置悬浮球的初始位置
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - ((screen.getPrimaryDisplay().workAreaSize.width/2)+200), top: screen.getPrimaryDisplay().workAreaSize.height - ((screen.getPrimaryDisplay().workAreaSize.height/2)+300) }
  win3.setPosition(left, top) //设置悬浮球位置
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win3.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/login`)
  } else {
    win3.loadURL(`file://${__dirname}/index.html/#/login`)
  }
  ipcMain.on('close-suspension', () => {
    win3.hide();
  })
}

async function createSBallWindow() {
  win2 = new BrowserWindow({
    width: 360, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
    height: 160, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
    type: 'toolbar',  //创建的窗口类型为工具栏窗口
    frame: false,  //要创建无边框窗口
    resizable: false, //禁止窗口大小缩放
    show: false,  //先不让窗口显示
    transparent: true, //设置透明
    hasShadow: false, //不显示阴影
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前\
    // backgroundColor: rgba(255,255,255,0),
    webPreferences: {
      nodeIntegration: true,    // 是否集成 Nodejs
      enableRemoteModule: true,
      webSecurity: false,
      contextIsolation: false
    }
  })
  //通过获取用户屏幕的宽高来设置悬浮球的初始位置
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 400, top: screen.getPrimaryDisplay().workAreaSize.height - 200 }
  win2.setPosition(left, top) //设置悬浮球位置
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win2.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/ball`)
  } else {
    win2.loadURL(`file://${__dirname}/index.html/#/ball`)
  }
  ipcMain.on('close-suspension', () => {
    win2.hide();
    win.show();
  })
}

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    width: 1200,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    icon: nativeImage.createFromPath(iconPath),
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      webSecurity: false,
      devTools: true,//隐藏调试工具
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  function isDevelopmentShow() {
    createSBallWindow()
    createLoginWindow()
    ipcMain.on('login',() => {
      win3.show()
    })
    ipcMain.on('show', () => {
      win.restore()
    })
    ipcMain.on('min-app', () => {
      win.minimize()
    })
    ipcMain.on('max-app', () => {
      win.maximize()
    })
    ipcMain.on('window-close', function (e) {
      win.hide();    // 隐藏主程序窗口
      // app.exit()
    })
    ipcMain.on('ball', function () {
      win2.show();
      win.hide();
    })
    // 新建托盘
    tray = new Tray(nativeImage.createFromPath(iconPath));

    // 自定义托盘图标的内容菜单
    const contextMenu = Menu.buildFromTemplate([
      {
        // 点击退出菜单退出程序
        label: '退出', click: function () {
          win.destroy()
          app.quit()
        }
      },
      {
        label: '别点了，没用', click: function (e) {
          console.log(e);
        }
      }
    ])

    tray.setToolTip('pcMusic')  // 设置鼠标指针在托盘图标上悬停时显示的文本
    tray.setContextMenu(contextMenu)  // 设置图标的内容菜单
    // 点击托盘图标，显示主窗口
    tray.on("click", () => {
      win.show();
    })
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  }
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    isDevelopmentShow()
    const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
    session.defaultSession.cookies.set(cookie)
      .then(() => {
        // success
      }, (error) => {
        console.error(error)
      })
  } else {
    createProtocol('app')
    isDevelopmentShow()
    // Load the index.html when not in development
    win.loadURL('app://./index.html')

  }
}




const NOTIFICATION_TITLE = '项目启动成功！'
const NOTIFICATION_BODY = '这是测试的通知'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}
app.whenReady().then(createWindow).then(showNotification)//系统消息通知

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', async () => {
//   if (isDevelopment && !process.env.IS_TEST) {
//     // Install Vue Devtools
//     try {
//       await installExtension(VUEJS3_DEVTOOLS)
//     } catch (e) {
//       console.error('Vue Devtools failed to install:', e.toString())
//     }
//   }
//   createWindow()
// })


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
