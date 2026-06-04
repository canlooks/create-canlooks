import {Theme, useTheme} from '@mui/material'
import {useMemo} from 'react'

export const defaultFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji', 'Microsoft YaHei UI', sans-serif`

export const defaultMonospaceFontFamily = `'Consolas', 'SF Mono', 'Cascadia Code', 'Menlo',
    'DejaVu Sans Mono', 'Ubuntu Mono', monospace`

export function defineCss<T>(callback: (theme: Theme) => T): () => T {
    return () => {
        const theme = useTheme()

        return useMemo(() => callback(theme), [theme])
    }
}
