import {type ReactNode, useLayoutEffect} from 'react'
import Color from 'color'

import {adjustPrimaryColorForTheme, normalizeFontSize, useAppearanceStore} from '@/stores/appearance.store'

export function ThemeProvider({children}: {children: ReactNode}) {
    const {fontSize, primaryColor, theme} = useAppearanceStore('fontSize', 'primaryColor', 'theme')

    useLayoutEffect(() => {
        const root = document.documentElement
        const primary = adjustPrimaryColorForTheme(primaryColor, theme)
        const whiteContrast = Color(primary).contrast(Color('#fff'))

        root.classList.toggle('dark', theme === 'dark')
        root.classList.toggle('light', theme === 'light')
        root.style.setProperty('--primary', primary)
        root.style.setProperty('--primary-foreground', whiteContrast >= 4.5 ? '#fff' : '#000')
        root.style.fontSize = `${normalizeFontSize(fontSize)}px`
    }, [fontSize, primaryColor, theme])

    return children
}
