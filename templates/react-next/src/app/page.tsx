'use client'

import {Flex, Typography} from '@canlooks/can-ui'
import {exampleStore} from '@/stores/example'
import {Hello} from '@/components/hello'

export default function AppPage() {
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