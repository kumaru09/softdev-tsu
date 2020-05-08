import React, { useEffect } from 'react'
import { Container, List, makeStyles, Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTranscript } from '../slices/transcript'
import Transcripts from '../component/Transcripts'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    color: 'white'
  },
}));

const TranscriptsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const transcripts = useSelector(state => state.transcript.transcript)
  const loading = useSelector(state => state.transcript.loading)

  useEffect(() => {
    dispatch(fetchAllTranscript())
  }, [dispatch])

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

  const renderTranscript = () => {
    if (loading) return <Typography>กำลังโหลดข้อมูล...</Typography>
    if (!transcripts) return <Typography>ไม่มีประวัติการแจ้งโอน...</Typography>

    return Array.isArray(transcripts) && transcripts.map((transcript) => (<Transcripts key={transcript.tour} transcript={transcript} deleteTranscript={deleteTranscript} />))
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" className={classes.root}>
        <Card>
          <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5">ประวัติการแจ้งโอนเงิน</Typography>}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <List>
                {renderTranscript()}
              </List>
            </CardContent>
          </Grid>
        </Card>
      </Grid>

    </Container>
  )
}

export default TranscriptsPage