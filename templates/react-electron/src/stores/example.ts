import {reactive} from '@canlooks/reactive'

@reactive
class ExampleStore {
    msg = 'Hello!'
}

export const exampleStore = new ExampleStore()