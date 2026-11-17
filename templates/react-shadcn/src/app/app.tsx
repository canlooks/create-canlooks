import {routeEntry} from './routes'
import {ThemeProvider} from './theme.provider'
import {Router} from '@canlooks/react-router'
import {GlobalSnackbar} from '@/components/globalSnackbar/globalSnackbar'

export function App() {
    return (
        <ThemeProvider>
            <Router entry={routeEntry}/>
            <GlobalSnackbar/>
        </ThemeProvider>
    )
}