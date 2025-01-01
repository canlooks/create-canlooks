import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
    envDir: path.resolve('env'),
    resolve: {
        extensions: ['.tsx', '.ts', '.json']
    },
    build: {
        emptyOutDir: true
    }
})