import {memo} from 'react'
import {Stack, Typography} from '@mui/material'
import {style} from './index.style'
import {Example} from '@/components/example/example'

export const Index = memo(() => {
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