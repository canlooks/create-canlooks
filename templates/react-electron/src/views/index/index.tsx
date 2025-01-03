import {RC} from '@canlooks/reactive/react'
import {Flex, Typography} from '@canlooks/can-ui'
import logo from '/logo.png'
import {exampleStore} from '../../stores/example'
import {Hello} from '../../components/hello/hello'

export const Index = RC(() => {
    return (
        <Flex height="100%" alignItems="center" justifyContent="center">
            <Flex direction="column" alignItems="center">
                <img src={logo}/>
                <Typography.h1 color="text.primary">{exampleStore.msg} This is Canlooks UI.</Typography.h1>
                <Hello/>
            </Flex>
        </Flex>
    )
})