import {Redirect, RouteItem} from '@canlooks/react-router'
import {Index} from '@/views/index'

export const routeEntry: RouteItem = {
    children: {
        '#index': {
            page: <Index/>
        },
        '**': {
            page: <Redirect to="/"/>
        }
    }
}