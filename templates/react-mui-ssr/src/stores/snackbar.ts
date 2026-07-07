import {createStore, type SetStateMethod} from '@canlooks/statio'
import type {AlertColor} from '@mui/material/Alert'

class SnackbarStore {
    constructor(private set: SetStateMethod<SnackbarStore>) {
    }

    key = 0
    message = ''
    open = false
    severity: AlertColor = 'error'

    show(message: string, severity: AlertColor) {
        this.set(({key}) => ({
            key: key + 1,
            message,
            open: true,
            severity
        }))
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

    close() {
        this.set({open: false})
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
