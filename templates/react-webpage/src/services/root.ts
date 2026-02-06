import {AjaxError, AjaxResponse, Config, RequestInterceptor, ResolvedConfig, ResponseInterceptor, Service} from '@canlooks/ajax'
import {root} from './urls'

@Config({
    url: root,
    headers: {
        'Content-Type': 'application/json'
    }
})
export class RootService extends Service {
    @RequestInterceptor
    requestInterceptor(config: ResolvedConfig) {
        config.headers.set('token', 'this_is_an_example_for_setting_token')
        return config
    }

    @ResponseInterceptor
    responseInterceptor(res: AjaxResponse<any>, error: AjaxError, config: ResolvedConfig) {
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