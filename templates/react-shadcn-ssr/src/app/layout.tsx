import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import {systemStore} from '@/stores/system.store'
import {App} from './app'
import './global.css'

export const metadata: Metadata = {
    title: systemStore.title,
    icons: {icon: '/logo.png'}
}

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="en" className="dark">
            <body>
                <div id="app">
                    <App>{children}</App>
                </div>
            </body>
        </html>
    )
}
