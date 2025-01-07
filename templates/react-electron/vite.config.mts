import {defineConfig} from 'vite'

export default defineConfig({
    base: './',
    envDir: 'env',
    build: {
        outDir: 'dist/renderer'
    },
    server: {
        port: 5188,
        open: true
    }
})