'use client'

import {memo} from 'react'
import {style} from './example.style'
import {useExampleStore} from '@/stores/example.store'
import {Button, Stack} from '@mui/material'

export const Example = memo(() => {
    const exampleStore = useExampleStore('msg', 'sayHello')

    return (
        <Stack css={style} spacing={3}>
            <div className="message">{exampleStore.msg}</div>
            <Button variant="contained" onClick={exampleStore.sayHello}>Say Hello!</Button>
        </Stack>
    )
})