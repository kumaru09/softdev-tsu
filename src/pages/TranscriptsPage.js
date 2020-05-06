import React, { useEffect } from 'react'
import { Container, List } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTranscript } from '../slices/transcript'
import Transcripts from '../component/Transcripts'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

const TranscriptsPage = () => {
    const dispatch = useDispatch()
    const transcripts = useSelector(state => state.transcript.transcript)

    useEffect (() => {
        dispatch(fetchAllTranscript())
    },[dispatch])

    const deleteTranscript = (id) => {
        Axios.delete(`https://api.19991999.xyz/transcripts/${id}`, { headers: authHeader() })
        .then(res => {
            dispatch(fetchAllTranscript())
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container maxWidth="md">
        <List>
            {transcripts && transcripts.map((transcript) => (<Transcripts key={transcript.tour} transcript={transcript} deleteTranscript={deleteTranscript} />))}
        </List>
        </Container>
    )
}

export default TranscriptsPage