import React, { useEffect } from 'react'
import { Container, Typography, List, Grid, Card, CardHeader, CardContent, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTourTranscript } from '../slices/transcript'
import Transcript from '../component/Transcript'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    color: 'white'
  },
}));

const TourTranPage = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const transcripts = useSelector(state => state.transcript.transcript)
  const loading = useSelector(state => state.transcript.loading)

  useEffect(() => {
    const { id } = match.params
    console.log(id)
    dispatch(fetchTourTranscript(id))
  }, [dispatch, match])

  const renderTourTran = () => {
    if (loading) return <p>กำลังโหลดข้อมูล..</p>
    return Array.isArray(transcripts) && transcripts.map((transcript) => (<Transcript key={transcript.user} transcript={transcript} confirmTour={confirmTour} />))
  }

  async function confirmTour(user, confirm) {
    let { id } = match.params
    let time = confirm ? null : moment(0).toJSON()
    console.log(time)
    Axios.post(`https://api.19991999.xyz/tours/${id}/transcripts/${user}`, { confirm: confirm, time: time }, { headers: authHeader() })
      .then((res) => {
        console.log(res)
        dispatch(fetchTourTranscript(id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" className={classes.root}>
        <Card>
          <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5">รายการแจ้งโอนเงินของทัวร์</Typography>}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <List>
                {renderTourTran()}
              </List>
            </CardContent>
          </Grid>
        </Card>
      </Grid>

    </Container>
  )
}

export default TourTranPage