import {Initialize} from '@canlooks/nest'
import {app as electron, BrowserWindow} from 'electron'
import path from 'path'
import './preload'

export default class App {
    @Initialize
    async _() {
        await electron.whenReady()
        const win = new BrowserWindow({
            width: 1280,
            height: 750,
            useContentSize: true,
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'preload.js')
            }
        })
        if (electron.isPackaged) {
            await win.loadFile('dist/renderer/index.html')
        } else {
            const {createServer} = await import('vite')
            const server = await createServer()
            const {config: {server: {port}}} = await server.listen()
            await win.loadURL('http://localhost:' + port)
            win.webContents.openDevTools({mode: 'undocked'})
        }
    }
}