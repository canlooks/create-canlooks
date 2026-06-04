export const root = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_SERVER === 'remote'
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof location !== 'undefined'
        ? location.origin
        : ''