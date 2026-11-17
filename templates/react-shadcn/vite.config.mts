import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [tailwindcss()],
    envDir: path.resolve('env'),
    resolve: {
        alias: {
            '@': path.resolve('src'),
        }
    },
    build: {
        emptyOutDir: true,
        rolldownOptions: {
            onLog(level, log, forward) {
                // The entire bundle already runs on the client, including the UI primitives.
                if (log.code === 'MODULE_LEVEL_DIRECTIVE' && log.message.includes('"use client"')) return
                forward(level, log)
            }
        }
    }
})
