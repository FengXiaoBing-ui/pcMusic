import {  contextBridge, ipcRenderer,session } from 'electron'
window.ipcRenderer = ipcRenderer
window.session = session