import {ReactNode} from 'react'
import {ThemeProvider} from '@/providers/theme.provider'
import {InitColorSchemeScript} from '@mui/material'
import EmotionProvider from '@/providers/emotion.provider'

export default function AppLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>Create Canlooks</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" href="/logo.png"/>
        </head>
        <body>
        <InitColorSchemeScript attribute="class" defaultMode="dark"/>
        <EmotionProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </EmotionProvider>
        </body>
        </html>
    )
}