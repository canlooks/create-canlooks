import {css} from '@emotion/react'

import {defineCss} from '@/lib/style'

export const style = defineCss(({zIndex}) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    left: 50%;
    pointer-events: none;
    position: fixed;
    top: 16px;
    transform: translateX(-50%);
    width: min(420px, calc(100vw - 32px));
    z-index: ${zIndex.snackbar};

    .global-snackbar-root.MuiSnackbar-root {
        bottom: auto;
        left: auto;
        pointer-events: auto;
        position: static;
        right: auto;
        top: auto;
        transform: none;
        width: 100%;
    }

    .global-snackbar-collapse.MuiCollapse-root {
        width: 100%;
    }

    .global-snackbar-collapse .MuiCollapse-wrapperInner {
        padding-bottom: 8px;
    }

    .global-snackbar-alert.MuiAlert-root {
        align-items: center;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.36);
        width: 100%;
    }
`)
