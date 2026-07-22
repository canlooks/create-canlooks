import {RootService} from './root'
import {Config} from '@canlooks/ajax'

@Config({url: '/example'})
export class ExampleService extends RootService {
    static foo() {
        return this.post('/foo', {
            data: {}
        })
    }
}