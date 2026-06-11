import {IpcRenderer} from 'electron'

declare global {
    namespace globalThis {
        // eslint-disable-next-line no-var
        var ipcRenderer: IpcRenderer
    }

    interface Window {
        ipcRenderer: IpcRenderer
    }
}