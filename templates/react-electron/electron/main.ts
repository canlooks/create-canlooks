import {Nest} from '@canlooks/nest'
import {electronPlugin} from '@canlooks/nest-plugin-electron'
import {BrowserWindowComponent} from './browserWindow'
import {ExampleController} from './controllers/example'

Nest
    .use(electronPlugin)
    .create([
        BrowserWindowComponent,
        ExampleController
    ])