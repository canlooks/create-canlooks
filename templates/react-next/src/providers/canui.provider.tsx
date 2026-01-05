'use client'

import {ReactNode} from 'react'
import {App as CanUI} from '@canlooks/can-ui'
import {Global} from '@emotion/react'
import {globalStyle} from './style'
import {RC} from '@canlooks/reactive/react'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const CanUIProvider = RC(({children}: {
    children?: ReactNode
}) => {
    return (
        <CanUI
            theme={{
                mode: 'light',
                colors: {primary: '#1e71ec'}
            }}
        >
            {children}
            <GlobalStyles/>
        </CanUI>
    )
})

function GlobalStyles() {
    return (
        <Global styles={globalStyle}/>
    )
}

export default CanUIProvider