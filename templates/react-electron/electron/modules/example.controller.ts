import {Action, Controller, Inject} from '@canlooks/nest'
import ExampleService from './example.service'

@Controller('example')
export default class ExampleController {
    /**
     * 如果`ExampleService`中使用了NodeJS内置模块，或其他<b>无法</b>在渲染进程使用的模块时，建议使用以下写法。
     * @example
     * ```
     * @Inject(() => import('./example.service'))
     * ```
     * 使得`ExampleService`不会在渲染进程中引入.
     * 或使用`rendererIgnoreVitePlugin()`
     */

    @Inject(ExampleService)
    private service!: ExampleService

    @Action('hello')
    hello(): Promise<string> {
        return this.service.hello()
    }
}