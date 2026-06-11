import {createStore, SetStateMethod} from '@canlooks/statio'
import {ExampleService} from '@/services/example'

class ExampleStore {
    constructor(private set: SetStateMethod<ExampleStore>) {
    }

    msg = 'Hello!'

    async sayHello() {
        const msg = await ExampleService.hello()
        this.set({msg})
    }
}

export const useExampleStore = createStore(ExampleStore)