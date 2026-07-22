import {Ref} from 'react'

/**
 * 克隆Ref
 * @param refs
 */
export function cloneRef<T>(...refs: (Ref<T> | undefined)[]): (ref: T | null) => void {
    return (r: T | null) => {
        refs.forEach(ref => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(r)
                } else {
                    ref.current = r
                }
            }
        })
    }
}