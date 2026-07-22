import {createStore, type SetStateMethod} from '@canlooks/statio'
import {AlertColor} from '@mui/material'

export type SnackbarQueueItem = {
    key: number
    message: string
    open: boolean
    severity: AlertColor
}

const maxSnackbarCount = 5

class SnackbarStore {
    constructor(private set: SetStateMethod<SnackbarStore>) {
    }

    key = 0
    items: SnackbarQueueItem[] = []

    show(message: string, severity: AlertColor) {
        this.set(({items, key}) => {
            const nextKey = key + 1
            const openItems = items.filter(({open}) => open)
            const oldestOpenItem = openItems[0]

            return {
                key: nextKey,
                items: [
                    ...items.map((item) => (
                        openItems.length >= maxSnackbarCount && item.key === oldestOpenItem?.key
                            ? {
                                ...item,
                                open: false
                            }
                            : item
                    )),
                    {
                        key: nextKey,
                        message,
                        open: true,
                        severity
                    }
                ]
            }
        })
    }

    showError(message: string) {
        this.show(message, 'error')
    }

    showSuccess(message: string) {
        this.show(message, 'success')
    }

    showWarning(message: string) {
        this.show(message, 'warning')
    }

    close(key: number) {
        this.set(({items}) => ({
            items: items.map((item) => (
                item.key === key
                    ? {
                        ...item,
                        open: false
                    }
                    : item
            ))
        }))
    }

    remove(key: number) {
        this.set(({items}) => ({
            items: items.filter((item) => item.key !== key)
        }))
    }
}

export const useSnackbarStore = createStore(SnackbarStore)

export function showSnackbarError(message: string) {
    if (typeof window === 'undefined') {
        return
    }

    useSnackbarStore.getState().showError(message || '发生错误')
}

export function showSnackbarSuccess(message: string) {
    if (typeof window === 'undefined') {
        return
    }

    useSnackbarStore.getState().showSuccess(message || '操作成功')
}

export function showSnackbarWarning(message: string) {
    if (typeof window === 'undefined') {
        return
    }

    useSnackbarStore.getState().showWarning(message || '请注意')
}
