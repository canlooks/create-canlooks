import {RC, useLoading, useReactive} from '@canlooks/reactive/react'
import {Button, Typography} from '@canlooks/can-ui'
import {ipcMain} from '../../services/ipc'
import {delay} from '@canlooks/utils'

export const Hello = RC(() => {
    const state = useReactive({
        msg: ''
    })

    const clickHandler = useLoading(async () => {
        await delay(1000)
        state.msg = await ipcMain.example.hello()
    })

    return (
        <>
            {state.msg
                ? <Typography.h4
                    color="success"
                    style={{
                        height: 40,
                        margin: 0
                    }}
                >
                    {state.msg}
                </Typography.h4>
                : <Button
                    size="large"
                    onClick={clickHandler.load}
                    loading={clickHandler.loading}
                >
                    Click to say hello
                </Button>
            }
        </>
    )
})