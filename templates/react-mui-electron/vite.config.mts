import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
    base: './',
    envDir: path.resolve('env'),
    resolve: {
        alias: {
            '@': path.resolve('src'),
            '$': path.resolve('electron')
        }
    },
    build: {
        outDir: path.resolve('dist/renderer'),
        emptyOutDir: true
    },
    server: {
        port: 5188
    }
})