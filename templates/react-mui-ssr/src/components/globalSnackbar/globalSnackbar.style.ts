import {defineCss} from '@/lib/style'
import {css} from '@emotion/react'

export const style = defineCss(() => css`
    .global-snackbar-alert.MuiAlert-root {
        align-items: center;
        min-width: min(420px, calc(100vw - 32px));
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.36);
    }
`)
