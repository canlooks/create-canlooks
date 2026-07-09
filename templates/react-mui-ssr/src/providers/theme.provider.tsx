'use client'

import {createContext, memo, ReactNode, useContext, useEffect, useMemo} from 'react'
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider, PaletteOptions, PaletteMode} from '@mui/material'
import {Global} from '@emotion/react'

import {style} from './global.style'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {adjustPrimaryColorForTheme, normalizeFontSize, useAppearanceStore} from '@/stores/appearance.store'

export const defaultFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji', 'Microsoft YaHei UI', sans-serif`

export const defaultMonospaceFontFamily = `'Consolas', 'SF Mono', 'Cascadia Code', 'Menlo',
    'DejaVu Sans Mono', 'Ubuntu Mono', monospace`

export const customColors = {
    light: {
        example: '#993300'
    },
    dark: {
        example: '#cc6600'
    }
}

export const ColorContext = createContext(customColors)

export function useColorContext() {
    return useContext(ColorContext)
}

const darkPalette: PaletteOptions = {
    mode: 'dark',
    secondary: {
        main: '#9c27b0'
    }
}

const lightPalette: PaletteOptions = {
    mode: 'light',
    secondary: {
        main: '#9c27b0'
    }
}

function createPalette(mode: PaletteMode, primaryColor: string): PaletteOptions {
    return {
        ...(mode === 'dark' ? darkPalette : lightPalette),
        primary: {
            main: primaryColor
        }
    }
}

function createMuiTheme(mode: PaletteMode, primaryColor: string) {
    return createTheme({
        palette: createPalette(mode, primaryColor),
        typography: {
            fontFamily: defaultFontFamily,
            htmlFontSize: (16 / 14) * 16
        },
        shape: {
            borderRadius: 8
        }
    })
}

function syncDocumentAppearance(theme: PaletteMode, backgroundColor: string, fontSize: number) {
    const root = document.documentElement
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
    const textColor = theme === 'dark' ? '#ffffff': '#000000'

    root.classList.remove(oppositeTheme)
    root.classList.add(theme)
    root.style.colorScheme = theme
    root.style.color = textColor
    root.style.backgroundColor = backgroundColor
    root.style.fontSize = `${fontSize}px`
    document.body.style.color = textColor
    document.body.style.backgroundColor = backgroundColor
}

export const ThemeProvider = memo(({children}: {
    children?: ReactNode
}) => {
    const {fontSize, primaryColor, theme} = useAppearanceStore('fontSize', 'primaryColor', 'theme')
    const rootFontSize = normalizeFontSize(fontSize)
    const currentPrimaryColor = adjustPrimaryColorForTheme(primaryColor, theme)

    const muiTheme = useMemo(() => {
        return createMuiTheme(theme, currentPrimaryColor)
    }, [theme, currentPrimaryColor])

    const documentBackgroundColor = muiTheme.palette.background.default

    useEffect(() => {
        syncDocumentAppearance(theme, documentBackgroundColor, rootFontSize)
    }, [documentBackgroundColor, rootFontSize, theme])

    return (
        <MuiThemeProvider theme={muiTheme}>
            <ColorContext value={customColors}>
                <CssBaseline enableColorScheme/>
                <GlobalStyles/>
                {children}
            </ColorContext>
        </MuiThemeProvider>
    )
})

function GlobalStyles() {
    return (
        <>
            <Global styles={style}/>
        </>
    )
}
