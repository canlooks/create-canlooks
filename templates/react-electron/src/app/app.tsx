import {App as CanUI} from '@canlooks/can-ui'
import {Global} from '@emotion/react'
import {style} from './app.style'
import {Router, Routes} from '@canlooks/react-router'
import {routes} from './routes'

export function App() {
    return (
        <CanUI theme={{
            colors: {primary: '#1e71ec'}
        }}>
            <Global styles={style}/>
            <AppContent/>
        </CanUI>
    )
}

function AppContent() {
    return (
        <Router mode="hash">
            <Routes routes={routes}/>
        </Router>
    )
}