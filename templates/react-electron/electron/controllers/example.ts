import {Action, Controller, Inject} from '@canlooks/nest'
import type ExampleService from '../services/example'

@Controller('example')
export class ExampleController {
    /**
     * 一般情况下可使用更方便的同步注入
     * 例如： @Inject(ExampleService)
     * <br/>
     * 但如果`ExampleService`中使用了NodeJS内置模块，或其他<b>无法</b>在渲染进程使用的模块时，建议使用以下写法。
     * 使得`ExampleService`不会在渲染进程中引入；
     */
    @Inject(() => import('../services/example'))
    private service!: ExampleService

    @Action('hello')
    hello(): Promise<string> {
        return this.service.hello()
    }
}