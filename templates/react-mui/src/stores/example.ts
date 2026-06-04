import {createStore, SetStateMethod} from '@canlooks/statio'

class ExampleStore {
    constructor(private set: SetStateMethod<ExampleStore>) {
    }

    msg = 'Hello!'

    sayHello() {
        this.set({msg: 'Hi!'})
    }
}

export const useExampleStore = createStore(ExampleStore)