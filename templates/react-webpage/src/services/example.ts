import {RootService} from './root'
import {Module} from '@canlooks/ajax'

@Module({url: '/example'})
export class ExampleService extends RootService {
    foo() {
        return this.post('/foo', {
            data: {}
        })
    }
}