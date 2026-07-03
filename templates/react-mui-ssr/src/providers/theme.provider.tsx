'use client'

import {createContext, memo, ReactNode} from 'react'
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider, PaletteOptions} from '@mui/material'
import {Global} from '@emotion/react'

import {defaultFontFamily} from '@/lib/style'
import {style} from './global.style'

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

const customColors = {
    light: {
        example: '#993300'
    },
    dark: {
        example: '#cc6600'
    }
}

export const ColorContext = createContext(customColors)

export const ThemeProvider = memo(({children}: {
    children?: ReactNode
}) => {
    return (
        <MuiThemeProvider theme={theme} defaultMode="dark">
            <ColorContext value={customColors}>
                <CssBaseline enableColorScheme/>
                <GlobalStyles/>
                {children}
            </ColorContext>
        </MuiThemeProvider>
    )
})

function GlobalStyles() {
    return <Global styles={style}/>
}
