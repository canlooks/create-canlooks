import {Nest} from '@canlooks/nest'
import {electronPlugin} from '@canlooks/nest-plugin-electron'
import {App} from './app/app'
import {ExampleController} from './controllers/example'

Nest
    .use(electronPlugin)
    .create([
        App,
        ExampleController
    ])