'use client'

import {ReactNode} from 'react'
import {App as CanUI} from '@canlooks/can-ui'
import {Global} from '@emotion/react'
import {style} from '@/app/style'
import {RC} from '@canlooks/reactive/react'

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
        <Global styles={style}/>
    )
}

export default CanUIProvider