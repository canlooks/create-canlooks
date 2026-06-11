import {defineCss} from '@/lib/style'
import {css} from '@emotion/react'

export const style = defineCss(({palette: {secondary}}) => css`
    align-items: center;
    
    .message {
        color: ${secondary.main};
        font-weight: 700;
    }
`)