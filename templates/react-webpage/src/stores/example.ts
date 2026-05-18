import {createStore} from '@canlooks/statio'

class ExampleStore {
    msg = 'Hello!'
}

export const useExampleStore = createStore(ExampleStore)