import Roost from '@canlooks/roost'
import {App} from './app/app'
import {ElectronMainPlugin} from '@canlooks/roost-electron'

Roost.create({
    anonymous: [App],
    plugins: [ElectronMainPlugin()]
})