import next from 'next'
import {NextFunction, Request, Response} from 'express'
import {NextBundlerOptions, NextServerOptions} from 'next/dist/server/next'
import path from 'path'

export type RenderOptions = NextServerOptions & NextBundlerOptions

export default function renderUI(options: RenderOptions = {}) {
    const dev = process.env.NODE_ENV === 'development'
    const nextApp = next({
        dev,
        dir: path.join(__dirname, '..'),
        ...options
    })
    const nextAppPrepare = nextApp.prepare()

    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== 'GET' && !req.originalUrl.startsWith('/__nextjs')) {
            return next()
        }
        await nextAppPrepare
        await nextApp.getRequestHandler()(req, res)
    }
}