/**
 * 拼接元素的类名
 * @param classes
 */
export function clsx(...classes: any[]) {
    const ret: string[] = []
    for (let i = 0, {length} = classes; i < length; i++) {
        const cls = classes[i]
        if (!cls) {
            continue
        }
        if (typeof cls === 'object') {
            if (Array.isArray(cls)) {
                cls.length && ret.push(clsx(...cls))
            } else {
                for (const k in cls) {
                    cls[k] && ret.push(k)
                }
            }
        } else {
            ret.push(cls)
        }
    }
    return ret.join(' ')
}