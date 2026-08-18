import {Redirect, RouteItem} from '@canlooks/react-router'
import {IndexPage} from '@/views/index/page'

export const routeEntry: RouteItem = {
    children: {
        '#index': {
            page: <IndexPage/>
        },
        '**': {
            page: <Redirect to="/"/>
        }
    }
}