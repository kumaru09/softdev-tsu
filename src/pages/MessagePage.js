import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessage } from '../slices/message'
import { Container, Grid, TextField, makeStyles } from '@material-ui/core'
import Message from '../component/Message'

const MessagePage = ({ match, location }) => {
    const dispatch = useDispatch()
    const name = new URLSearchParams(location.search).get("name")

    useEffect(() => {
        const { contact } = match.params

        dispatch(fetchMessage(contact))
    },[dispatch,match])
    
    const chat = useSelector(state => state.message.message)

    const renderMessage = () =>{ 
        if (!chat) return <p>ไม่มีข้อความ...</p>
        
        return chat.map((message) => (<Message key={message.time} message={message} name={message.me ? "" : name} />))
    }

    return (
        <Container maxWidth="md">
            <Grid container>
            <Grid item xs>
                 {renderMessage()}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    placeholder="พิมพ์ข้อความ..."
                />
            </Grid>
            </Grid>
           
        </Container>
    )
}

export default MessagePage