import {defineConfig} from 'vite'

export default defineConfig({
    base: './',
    envDir: 'env',
    build: {
        outDir: 'dist/renderer',
        emptyOutDir: true
    },
    server: {
        port: 5188
    }
})