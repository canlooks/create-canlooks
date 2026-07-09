import {css} from '@emotion/react'
import {defineCss} from '@/lib/style'
import {defaultFontFamily} from '@/providers/theme.provider'

export const style = defineCss(({palette: {mode, background}}) => css`
    html, body, #app {
        height: 100%;
        color: ${mode === 'dark' ? '#ffffff' : '#000000'};
        background-color: ${background.default};
    }

    *, *::before, *::after {
        font-family: ${defaultFontFamily};
    }
`)
