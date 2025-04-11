import {Instances, Nest} from '@canlooks/nest'
import {electronRendererPlugin} from '@canlooks/nest-plugin-electron-renderer'
import {ExampleController} from '../../electron/controllers/example'

/**
 * 如果你的生产环境支持`top-level await`，可将这段代码写成：
 * @example
 * export const ipcMain = await Nest
 *     .use(electronRendererPlugin, {ipcRenderer})
 *     .create(controllers)
 */

const controllers = {ExampleController}

export let ipcMain: Instances<typeof controllers>

Nest
    .use(electronRendererPlugin, {ipcRenderer})
    .create(controllers)
    .then(instances => ipcMain = instances)
