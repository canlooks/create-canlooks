import {Initialize, Module} from '@canlooks/roost'
import {app as electron, BrowserWindow} from 'electron'
import path from 'path'
import {ExampleController} from '../modules/example.controller'

@Module([ExampleController])
export class App {
    @Initialize
    async openWindow() {
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
            const {resolvedUrls} = await server.listen()
            const {local: [url]} = resolvedUrls!
            await win.loadURL(url)
            win.webContents.openDevTools({mode: 'undocked'})
        }
    }
}