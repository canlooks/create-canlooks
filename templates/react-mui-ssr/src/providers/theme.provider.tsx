'use client'

import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material'
import {memo, ReactNode} from 'react'
import {defaultFontFamily} from '@/lib/style'
import {style} from '@/providers/global.style'
import {Global} from '@emotion/react'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
    colorSchemes: {
        dark: true
    },
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    typography: {
        fontFamily: defaultFontFamily,
        htmlFontSize: (16 / 14) * 16,
    }
})

export const ThemeProvider = memo(({children}: {
    children?: ReactNode
}) => {
    return (
        <MuiThemeProvider theme={theme} defaultMode="dark">
            <CssBaseline enableColorScheme/>
            <GlobalStyles/>
            {children}
        </MuiThemeProvider>
    )
})

function GlobalStyles() {
    return <Global styles={style}/>
}