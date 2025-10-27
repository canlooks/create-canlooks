import {defineConfig} from 'vite'
import path from 'path'
import rendererIgnoreVitePlugin from '@canlooks/nest-plugin-electron-renderer/vite'

export default defineConfig({
    base: './',
    envDir: 'env',
    build: {
        outDir: path.resolve('dist/renderer'),
        emptyOutDir: true
    },
    server: {
        port: 5188
    },
    plugins: [
        rendererIgnoreVitePlugin({
            mainDirPath: path.resolve('electron')
        })
    ]
})