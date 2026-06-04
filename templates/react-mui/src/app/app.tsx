import {Global} from '@emotion/react'
import {style} from './app.style'
import {Router} from '@canlooks/react-router'
import {routeEntry} from './routes'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {defaultFontFamily} from '@/lib/style'

const theme = createTheme({
    colorSchemes: {
        dark: true
    },
    typography: {
        fontFamily: defaultFontFamily,
        htmlFontSize: (16 / 14) * 16,
    }
})

export function App() {
    return (
        <ThemeProvider theme={theme} defaultMode="dark">
            <AppContent/>
        </ThemeProvider>
    )
}

function AppContent() {
    return (
        <>
            <CssBaseline enableColorScheme/>
            <Global styles={style}/>
            <Router entry={routeEntry}/>
        </>
    )
}