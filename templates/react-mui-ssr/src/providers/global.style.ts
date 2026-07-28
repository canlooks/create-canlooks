import {css} from '@emotion/react'
import {defineCss} from '@/lib/style'
import {defaultFontFamily} from './theme.provider'
import Color from 'color'

export const style = defineCss(({palette: {mode, primary, background}}) => {
    const scrollbarColor = Color(primary.main).darken(0.3).string()

    return css`
        html, body, #app {
            height: 100%;
            color: ${mode === 'dark' ? '#ffffff' : '#000000'};
            background-color: ${background.default};
        }

        *, *::before, *::after {
            font-family: ${defaultFontFamily};
        }

        .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: ${scrollbarColor} ${background.paper};

            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }

            &::-webkit-scrollbar-track {
                background-color: ${background.paper};
                border-radius: 3px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${scrollbarColor};
                border-radius: 3px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background-color: ${primary.light};
            }
        }
    `
})
