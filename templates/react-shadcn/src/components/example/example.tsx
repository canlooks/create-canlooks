import {memo} from 'react'
import {Button} from '@/components/ui/button'
import {useExampleStore} from '@/stores/example.store'

export const Example = memo(() => {
    const exampleStore = useExampleStore('msg', 'sayHello')

    return (
        <div className="flex flex-col items-center gap-6">
            <p className="font-bold text-example">{exampleStore.msg}</p>
            <Button onClick={exampleStore.sayHello}>Say Hello!</Button>
        </div>
    )
})
