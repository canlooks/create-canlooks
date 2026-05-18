'use client'

import {memo, ReactNode} from 'react'
import {App as CanUI} from '@canlooks/can-ui'
import {Global} from '@emotion/react'
import {globalStyle} from './style'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const CanUIProvider = memo(({children}: {
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