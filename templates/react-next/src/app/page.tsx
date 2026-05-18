'use client'

import {Flex, Typography} from '@canlooks/can-ui'
import {Hello} from '@/components/hello'
import {useExampleStore} from '@/stores/example'

export default function AppPage() {
    const exampleStore = useExampleStore()

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" alignItems="center">
                <img src="/logo.png" alt="logo"/>
                <Typography.h1 color="text.primary">{exampleStore.msg} This is Canlooks UI.</Typography.h1>
                <Hello/>
            </Flex>
        </Flex>
    )
}