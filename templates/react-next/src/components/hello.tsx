import {RC, useReactive} from '@canlooks/reactive/react'
import {Button, Typography} from '@canlooks/can-ui'

export const Hello = RC(() => {
    const state = useReactive({
        msg: 'Click to say hello'
    })

    const clickHandler = () => {
        state.msg = 'Hi Canlooks!'
    }

    return (
        <>
            <Button
                size="large"
                onClick={clickHandler}
            >
                Hello
            </Button>
            <Typography.h2>{state.msg}</Typography.h2>
        </>
    )
})