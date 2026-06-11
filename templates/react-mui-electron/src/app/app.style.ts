import {css} from '@emotion/react'
import {defineCss} from '@/lib/style'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const style = defineCss(() => css`
    html, body, #app {
        height: 100%;
    }
`)