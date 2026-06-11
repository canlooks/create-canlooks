import {ipc} from '@/services/root'

export class ExampleService {
    static hello() {
        return ipc.ExampleController.hello()
    }
}