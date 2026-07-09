import {AbortError, AjaxError, AjaxResponse, Config, RequestInterceptor, ResolvedConfig, ResponseInterceptor, Service, TimeoutError} from '@canlooks/ajax'
import {root} from './urls'
import {showSnackbarError} from '@/stores/snackbar.store'

function getErrorMessage(error: AjaxError): string {
    if (error instanceof TimeoutError) {
        return '请求超时，请稍后重试'
    }

    const status = error.cause?.response?.status
    if (status === 401) {
        return '登录已过期，请重新登录'
    }

    if (status) {
        return `请求失败（${status}）`
    }

    return '网络异常，请检查网络连接'
}

@Config({
    url: root,
    headers: {
        'Content-Type': 'application/json'
    }
})
export class RootService extends Service {
    @RequestInterceptor
    static requestInterceptor(config: ResolvedConfig) {
        // 排除登录接口
        if (!config.url!.startsWith('/login')) {
            config.headers.set('token', 'this_is_an_example_for_setting_token')
        }
        return config
    }

    @ResponseInterceptor
    static responseInterceptor(res: AjaxResponse<any>, error: AjaxError) {
        if (error) {
            if (!(error instanceof AbortError)) {
                showSnackbarError(getErrorMessage(error))
            }
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