import {createStore, type SetStateMethod, storage} from '@canlooks/statio'
import Color from 'color'

import {systemStore} from './system.store'
import {PaletteMode} from '@mui/material'

export const defaultFontSize = 16
export const defaultPrimaryColor = '#1976d2'
export const maxFontSize = 20
export const minFontSize = 12
const primaryColorThemeAdjustment = 0.2

export function normalizeFontSize(fontSize: number) {
    return Math.min(maxFontSize, Math.max(minFontSize, Math.round(fontSize)))
}

export function normalizePrimaryColor(primaryColor: unknown) {
    if (typeof primaryColor !== 'string') {
        return defaultPrimaryColor
    }

    const color = primaryColor.trim().toLowerCase()

    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/.test(color) ? color : defaultPrimaryColor
}

export function adjustPrimaryColorForTheme(primaryColor: string, theme: PaletteMode) {
    const color = Color(normalizePrimaryColor(primaryColor))
    const themedColor = theme === 'dark'
        ? color.lighten(primaryColorThemeAdjustment)
        : color.darken(primaryColorThemeAdjustment)

    return themedColor.hex().toLowerCase()
}

class AppearanceStore {
    constructor(private set: SetStateMethod<AppearanceStore>) {
    }

    fontSize = defaultFontSize
    primaryColor = defaultPrimaryColor
    theme: PaletteMode = 'dark'

    setFontSize(fontSize: number) {
        this.set({fontSize: normalizeFontSize(fontSize)})
    }

    setPrimaryColor(primaryColor: string) {
        this.set({primaryColor: normalizePrimaryColor(primaryColor)})
    }

    setTheme(theme: PaletteMode) {
        this.set({theme})
    }
}

export const storageName = systemStore.appId + '-appearance'

export const useAppearanceStore = createStore(
    storage(AppearanceStore, {
        name: storageName,
        type: 'localStorage'
    })
)
