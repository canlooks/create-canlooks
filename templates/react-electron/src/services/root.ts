import {AjaxResponse, BeforeRequest, BeforeResponse, Module, ResolvedConfig, Service} from '@canlooks/ajax'
import {root} from './urls'

@Module({
    url: root
})
export class RootService extends Service {
    @BeforeRequest
    beforeRequest(config: ResolvedConfig) {
        config.headers.set('x-access-token', 'this_is_an_example_for_setting_token')
        return config
    }

    @BeforeResponse
    beforeResponse(res: AjaxResponse<any>, error: any, config: ResolvedConfig) {
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