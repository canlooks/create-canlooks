import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
    envDir: path.resolve('env'),
    resolve: {
        alias: {
            '@': path.resolve('src'),
        }
    },
})