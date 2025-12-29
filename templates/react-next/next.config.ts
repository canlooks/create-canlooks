import {NextConfig} from 'next'

const nextConfig: NextConfig = {
    distDir: 'dist',
    compiler: {
        emotion: true
    }
}

export default nextConfig