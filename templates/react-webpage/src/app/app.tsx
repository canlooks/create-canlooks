import {App as CanUI, Boundary} from '@canlooks/can-ui'
import {Global} from '@emotion/react'
import {style} from './app.style'
import {Router} from '@canlooks/react-router'
import {routeEntry} from './routes'

export function App() {
    return (
        <CanUI theme={{
            mode: 'light',
            colors: {primary: '#1e71ec'}
        }}>
            <AppContent/>
        </CanUI>
    )
}

function AppContent() {
    return (
        <>
            <Global styles={style}/>
            <Boundary>
                <Router entry={routeEntry}/>
            </Boundary>
        </>
    )
}