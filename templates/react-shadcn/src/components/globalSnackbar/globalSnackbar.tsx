import {memo, useEffect} from 'react'
import {toast} from 'sonner'

import {Toaster} from '@/components/ui/sonner'
import {useAppearanceStore} from '@/stores/appearance.store'
import {maxSnackbarCount, type SnackbarQueueItem, useSnackbarStore} from '@/stores/snackbar.store'

const autoHideDurations = {
    success: 3000,
    warning: 4000,
    error: 5000,
    info: 3000
}

function SnackbarNotification({item}: {item: SnackbarQueueItem}) {
    const {remove} = useSnackbarStore('remove')

    useEffect(() => {
        if (!item.open) {
            remove(item.key)
            return
        }

        const removeItem = () => remove(item.key)
        const id = toast[item.severity](item.title || item.message, {
            id: `snackbar-${item.key}`,
            description: item.title ? item.message : undefined,
            duration: autoHideDurations[item.severity],
            onAutoClose: removeItem,
            onDismiss: removeItem
        })

        return () => {
            toast.dismiss(id)
        }
    }, [item, remove])

    return null
}

export const GlobalSnackbar = memo(() => {
    const {items, close} = useSnackbarStore('items', 'close')
    const {theme} = useAppearanceStore('theme')
    const oldestKey = items.find(item => item.open)?.key

    useEffect(() => {
        if (oldestKey === undefined) return

        const escapeHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !event.defaultPrevented) {
                event.preventDefault()
                close(oldestKey)
            }
        }
        document.addEventListener('keydown', escapeHandler)
        return () => document.removeEventListener('keydown', escapeHandler)
    }, [oldestKey, close])

    return (
        <>
            <Toaster theme={theme} position="top-center" visibleToasts={maxSnackbarCount} offset={16} expand closeButton richColors/>
            {items.map(item => <SnackbarNotification key={item.key} item={item}/>)}
        </>
    )
})
