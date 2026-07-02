'use client'

import {memo, ReactNode} from 'react'
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider, PaletteOptions} from '@mui/material'
import {Global} from '@emotion/react'

import {GlobalSnackbar} from '@/components/globalSnackbar/globalSnackbar'
import {defaultFontFamily} from '@/lib/style'
import {style} from '@/providers/global.style'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const palette: PaletteOptions = {
    primary: {
        main: '#1976d2'
    }
}

const theme = createTheme({
    colorSchemes: {
        dark: {
            palette
        },
        light: {
            palette
        }
    },
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    typography: {
        fontFamily: defaultFontFamily,
        htmlFontSize: (16 / 14) * 16
    },
    shape: {
        borderRadius: 8
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
            <GlobalSnackbar/>
        </MuiThemeProvider>
    )
})

function GlobalStyles() {
    return <Global styles={style}/>
}
