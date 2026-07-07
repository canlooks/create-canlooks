'use client'

import {memo, type ComponentProps, type ReactElement, type SyntheticEvent} from 'react'

import {Alert, Collapse, Grow, Snackbar, type SnackbarCloseReason} from '@mui/material'

import {useSnackbarStore} from '@/stores/snackbar'

import {style} from './globalSnackbar.style'

const autoHideDurations = {
    success: 3000,
    warning: 4000,
    error: 5000,
    info: 3000
}

const snackbarCollapseDurations = {
    enter: 0,
    exit: 195
}

const snackbarGrowDurations = {
    enter: 225,
    exit: 0
}

const SnackbarCollapse = (props: ComponentProps<typeof Collapse>) => {
    const collapseProps = {...props}
    const {children} = collapseProps

    Reflect.deleteProperty(collapseProps, 'children')
    Reflect.deleteProperty(collapseProps, 'direction')
    Reflect.deleteProperty(collapseProps, 'ownerState')

    return (
        <Collapse {...collapseProps} timeout={snackbarCollapseDurations}>
            <Grow appear in timeout={snackbarGrowDurations}>
                {children as ReactElement}
            </Grow>
        </Collapse>
    )
}

export const GlobalSnackbar = memo(() => {
    const snackbarStore = useSnackbarStore('close', 'items', 'remove')

    const snackbarCloseHandler = (key: number, event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return
        }

        if (reason === 'escapeKeyDown') {
            event.preventDefault()
        }

        snackbarStore.close(key)
    }

    const alertCloseHandler = (key: number) => {
        snackbarStore.close(key)
    }

    const snackbarExitedHandler = (key: number) => {
        snackbarStore.remove(key)
    }

    return (
        <div css={style} className="global-snackbar-list">
            {snackbarStore.items.map((item) => (
                <Snackbar
                    className="global-snackbar-root"
                    key={item.key}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'top'
                    }}
                    autoHideDuration={autoHideDurations[item.severity]}
                    open={item.open}
                    slots={{
                        transition: SnackbarCollapse
                    }}
                    slotProps={{
                        transition: {
                            className: 'global-snackbar-collapse',
                            onExited: () => snackbarExitedHandler(item.key)
                        }
                    }}
                    onClose={(event, reason) => snackbarCloseHandler(item.key, event, reason)}
                >
                    <Alert
                        className="global-snackbar-alert"
                        severity={item.severity}
                        variant="filled"
                        onClose={() => alertCloseHandler(item.key)}
                    >
                        {item.message}
                    </Alert>
                </Snackbar>
            ))}
        </div>
    )
})
