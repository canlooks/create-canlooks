import {Action, Controller, Inject} from '@canlooks/roost'
import ExampleService from './example.service'

@Controller({ctrl: 'example'})
export class ExampleController {
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

    @Action({act: 'hello'})
    hello() {
        return this.service.hello()
    }
}