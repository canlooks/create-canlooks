import {ReactNode} from 'react'
import EmotionProvider from '@/providers/emotion.provider'
import CanUIProvider from '@/providers/canui.provider'

export default function AppLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en" style={{fontSize: 14}}>
        <head>
            <title>Create Canlooks</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" href="/logo.png"/>
        </head>
        <body>
        <EmotionProvider>
            <CanUIProvider>
                {children}
            </CanUIProvider>
        </EmotionProvider>
        </body>
        </html>
    )
}