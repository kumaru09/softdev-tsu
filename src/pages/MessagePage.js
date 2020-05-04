import React from 'react'
import { Message } from '../component/Message'
import { Container } from '@material-ui/core'

const MessagePage = () => {
    return (
        <Container maxWidth="md">
            <Message />
        </Container>
    )
    
}

export default MessagePage