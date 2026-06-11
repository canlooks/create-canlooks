import {createRoostRenderer} from '@canlooks/roost-electron-renderer'
import {ExampleController} from '$/modules/example.controller'

export const ipc = await createRoostRenderer({
    ExampleController
}, {ipcRenderer})