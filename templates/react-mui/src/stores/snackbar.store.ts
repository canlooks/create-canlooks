import {createStore, type SetStateMethod} from '@canlooks/statio'
import {AlertColor} from '@mui/material'

export type SnackbarQueueItem = {
    key: number
    message: string
    open: boolean
    severity: AlertColor
    title?: string
}

const maxSnackbarCount = 5

class SnackbarStore {
    constructor(private set: SetStateMethod<SnackbarStore>) {
    }

    key = 0
    items: SnackbarQueueItem[] = []

    show(message: string, severity: AlertColor, title?: string) {
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
                        severity,
                        title
                    }
                ]
            }
        })
    }

    showError(message: string, title?: string) {
        this.show(message, 'error', title)
    }

    showSuccess(message: string, title?: string) {
        this.show(message, 'success', title)
    }

    showWarning(message: string, title?: string) {
        this.show(message, 'warning', title)
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

export function showSnackbarError(message: string, title?: string) {
    if (typeof window === 'undefined') {
        return
    }

    useSnackbarStore.getState().showError(message || '发生错误', title)
}

export function showSnackbarSuccess(message: string, title?: string) {
    if (typeof window === 'undefined') {
        return
    }

    useSnackbarStore.getState().showSuccess(message || '操作成功', title)
}

export function showSnackbarWarning(message: string, title?: string) {
    if (typeof window === 'undefined') {
        return
    }

    useSnackbarStore.getState().showWarning(message || '请注意', title)
}
