import {Theme, useTheme} from '@mui/material'
import {useMemo} from 'react'
import Color from 'color'
import {customColors, useColorContext} from '@/providers/theme.provider'

export function alpha(color: string, value: number) {
    return Color(color).alpha(value).string()
}

export function mixColor(baseColor: string, mixinColor: string, weight: number) {
    return Color(baseColor).mix(Color(mixinColor), weight).string()
}

export function defineCss<T>(callback: (theme: Theme, customColor: typeof customColors['light' | 'dark']) => T): () => T {
    return () => {
        const theme = useTheme()
        const customColor = useColorContext()

        return useMemo(() => callback(theme, customColor[theme.palette.mode]), [theme, customColor])
    }
}