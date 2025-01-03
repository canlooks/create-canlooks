import {css} from '@emotion/react'

export const style = css`
    html, body, #app {
        height: 100%;
        margin: 0;
    }

    html, body, .scrollbar {
        &::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 1000em;

            &:hover {
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }
`