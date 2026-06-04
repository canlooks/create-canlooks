'use client'

import {memo} from 'react'
import {Stack, Typography} from '@mui/material'
import {style} from './page.style'
import {Example} from '@/components/example/example'

const AppPage = memo(() => {
    return (
        <Stack css={style}>
            <Stack className="wrap" spacing={3}>
                <img src="/logo.png" alt="logo"/>
                <Typography className="title" variant="h2">This is Material UI template created by C.CanLiang.</Typography>

                <Example/>
            </Stack>
        </Stack>
    )
})

export default AppPage