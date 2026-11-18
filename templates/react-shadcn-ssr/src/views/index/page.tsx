import {memo} from 'react'
import {Example} from '@/components/example/example'
import {systemStore} from '@/stores/system.store'

export const IndexPage = memo(() => {
    return (
        <main className="flex min-h-full flex-col items-center justify-center gap-6 p-6 text-center">
            <img src="/logo.png" alt="Canlooks" width={256} height={256}/>
            <h1 className="text-3xl font-light tracking-tight sm:text-5xl">{systemStore.subTitle}</h1>
            <Example/>
        </main>
    )
})
