import {App as CanUI} from '@canlooks/can-ui'
import {Global} from '@emotion/react'
import {style} from './app.style'
import {Router, Routes} from '@canlooks/react-router'
import {routes} from './routes'

export function App() {
    return (
        <CanUI theme={{
            mode: 'dark',
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
            <Router mode="hash">
                <Routes routes={routes}/>
            </Router>
        </>
    )
}