import {ReactNode} from 'react'
import {ThemeProvider} from '@/providers/theme.provider'
import {EmotionProvider} from '@/providers/emotion.provider'
import {GlobalSnackbar} from '@/components/globalSnackbar/globalSnackbar'
import {systemStore} from '@/stores/system.store'

const AppLayout = ({children}: {
    children: ReactNode
}) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>{systemStore.title}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" href="/logo.png"/>
        </head>
        <body>
        <EmotionProvider>
            <ThemeProvider>
                {children}
                <GlobalSnackbar/>
            </ThemeProvider>
        </EmotionProvider>
        </body>
        </html>
    )
}

export default AppLayout