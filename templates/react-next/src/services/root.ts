import {AjaxError, AjaxResponse, BeforeRequest, BeforeResponse, Module, ResolvedConfig, Service} from '@canlooks/ajax'
import {login, root} from './urls'

@Module({
    url: root,
    headers: {
        'Content-Type': 'application/json'
    }
})
export class RootService extends Service {
    @BeforeRequest
    beforeRequest(config: ResolvedConfig) {
        // 排除登录接口
        if (!config.url!.startsWith(login)) {
            config.headers.set('token', 'this_is_an_example_for_setting_token')
        }
        return config
    }

    @BeforeResponse
    beforeResponse(res: AjaxResponse<any>, error: AjaxError, config: ResolvedConfig) {
        if (error) {
            /**
             * Your error handling logic here.
             */
            throw error
        }
        const {result} = res
        /**
         * Your response handling logic here.
         */
        return result
    }
}