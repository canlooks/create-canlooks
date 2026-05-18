import {Button, Typography} from '@canlooks/can-ui'
import {memo, useState} from 'react'

export const Hello = memo(() => {
    const [msg, setMsg] = useState('Click to say hello')

    const clickHandler = () => {
        setMsg('Hello Canlooks!')
    }

    return (
        <>
            <Button
                size="large"
                onClick={clickHandler}
            >
                Hello
            </Button>
            <Typography.h2>{msg}</Typography.h2>
        </>
    )
})