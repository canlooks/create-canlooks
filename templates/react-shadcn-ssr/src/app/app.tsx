'use client'

import type {ReactNode} from 'react'
import {ThemeProvider} from './theme.provider'
import {Toaster} from '@/components/ui/sonner'
import {useAppearanceStore} from '@/stores/appearance.store'

export function App({children}: {children: ReactNode}) {
    const {theme} = useAppearanceStore('theme')

    return (
        <ThemeProvider>
            {children}
            <Toaster theme={theme} position="top-center" visibleToasts={5} offset={16} expand closeButton richColors/>
        </ThemeProvider>
    )
}
