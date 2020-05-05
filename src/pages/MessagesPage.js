import React, { useEffect } from 'react'
import { Messages } from '../component/Messages'
import { Container, List, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../slices/messages'

const MessagePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMessages())

    },[dispatch])

    const messages = useSelector(state => state.messages.messages)

    const renderMessages = () =>{ 
        if (!messages) return <p>ไม่มีข้อความ...</p>
        
        return messages.map((message) => (<Messages key={message.contact} message={message} />))
    }

    return (
        <Container maxWidth="md">
        <Typography variant="h4">
            กล่องข้อความ
        </Typography>
        <List>
            {renderMessages()}
        </List>            
        </Container>
    )
    
}

export default MessagePage