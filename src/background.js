'use strict'

import { app, protocol, BrowserWindow, Notification, Menu, ipcMain, Tray } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path')
let tray = null
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const menu = Menu.buildFromTemplate([])
Menu.setApplicationMenu(menu)


async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    frame: false,
    width: 900,
    height: 700,
    icon: "http://124.220.219.72:8084/static/video/icon.ico",
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      devTools: true,//隐藏调试工具
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
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
    // 新建托盘
    tray = new Tray(path.join(__dirname, 'favicon.ico'));

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
  } else {
    createProtocol('app')
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
