import {redirect, RedirectType} from 'next/navigation'

export function replaceLocation(url: string, searchParams?: string | URLSearchParams) {
    if (searchParams) {
        url += `?${searchParams}`
    }
    typeof window !== 'undefined'
        ? location.replace(url)
        : redirect(url, RedirectType.replace)
}