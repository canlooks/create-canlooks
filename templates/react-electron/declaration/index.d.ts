import {IpcRenderer} from 'electron'

declare global {
    namespace globalThis {
        var ipcRenderer: IpcRenderer
    }

    interface Window {
        ipcRenderer: IpcRenderer
    }
}