import {Nest} from '@canlooks/nest'
import {electronPlugin} from '@canlooks/nest-plugin-electron'
import App from './app/app'
import ExampleController from './modules/example.controller'

Nest
    .use(electronPlugin)
    .create([
        App,
        ExampleController
    ])
    .then()