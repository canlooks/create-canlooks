import {routeEntry} from './routes'
import {ThemeProvider} from './theme.provider'
import {Router} from '@canlooks/react-router'
import {Toaster} from '@/components/ui/sonner'
import {useAppearanceStore} from '@/stores/appearance.store'

export function App() {
    const {theme} = useAppearanceStore('theme')

    return (
        <ThemeProvider>
            <Router entry={routeEntry}/>
            <Toaster theme={theme} position="top-center" visibleToasts={5} offset={16} expand closeButton richColors/>
        </ThemeProvider>
    )
}
