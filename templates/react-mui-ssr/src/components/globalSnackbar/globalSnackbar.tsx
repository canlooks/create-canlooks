'use client'

import {memo, type SyntheticEvent} from 'react'

import {Alert, Snackbar, type SnackbarCloseReason} from '@mui/material'

import {useSnackbarStore} from '@/stores/snackbar'

import {style} from './globalSnackbar.style'

export const GlobalSnackbar = memo(() => {
    const snackbarStore = useSnackbarStore('close', 'key', 'message', 'open', 'severity')

    const snackbarCloseHandler = (_event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return
        }

        snackbarStore.close()
    }

    const alertCloseHandler = () => {
        snackbarStore.close()
    }

    return (
        <Snackbar
            css={style}
            key={snackbarStore.key}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'top'
            }}
            autoHideDuration={4500}
            open={snackbarStore.open}
            onClose={snackbarCloseHandler}
        >
            <Alert
                className="global-snackbar-alert"
                severity={snackbarStore.severity}
                variant="filled"
                onClose={alertCloseHandler}
            >
                {snackbarStore.message}
            </Alert>
        </Snackbar>
    )
})
