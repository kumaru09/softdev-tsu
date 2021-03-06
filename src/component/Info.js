import React, { Fragment } from 'react'
import { CardContent, Typography, CardActions, Button, makeStyles, Chip, Grid, CardHeader } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EventIcon from '@material-ui/icons/Event'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../helpers/history'
import PeopleIcon from '@material-ui/icons/People';

const useStyle = makeStyles((theme) => ({
  typography: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    display: 'inline'
  },
  header: {
    padding: '4px',
    backgroundColor: theme.palette.primary.main
  }
}))

const Info = ({ tour, addTran, ownerTour }) => {
  const classes = useStyle()
  const hasTranscript = useSelector(state => state.transcript.hasTranscript)
  const transcript = useSelector(state => state.transcript.transcript)

  return (
    <Fragment>
      {console.log()}
      <CardHeader
        className={classes.header}
        title={tour.category}
      />
      <CardContent>
        <Typography className={classes.typography} gutterBottom>
          <EventIcon fontSize="small" />
          {"วันที่: " + moment(tour.first_day).format('L') + " - " + moment(tour.last_day).format('L')}
        </Typography>
        <Typography className={classes.typography} gutterBottom>
          <AccessTimeIcon fontSize="small" />
          {"เวลา: " + moment(tour.first_day).format('LT') + " - " + moment(tour.last_day).format('LT')}
        </Typography>
        <Typography className={classes.typography} style={{ display: 'inline' }} gutterBottom >
          <LocationOnIcon fontSize="small" />
          {"สถานที่: "}
        </Typography>
        <Grid container wrap="wrap" className={classes.root}>
          {tour.list && tour.list.map((list) => (<Chip key={list} label={list} />))}
        </Grid>
        <Typography className={classes.typography} gutterBottom>
          <AttachMoneyIcon fontSize="small" />
          {"ค่าใช้จ่าย: "}{tour.price ? tour.price : "FREE"}
        </Typography>
        <Typography className={classes.typography} gutterBottom>
          <PeopleIcon fontSize="small" />
          {"จำนวนคนที่เข้าร่วมแล้ว: "}{tour.confirm + "/" + tour.max_member}
        </Typography>
      </CardContent>
      <CardActions>
        {ownerTour() ?
          <Button color="secondary" component={Link} fullWidth variant="contained" to={`/tours/${tour.id}/transcript`}>รายการแจ้งโอนเงิน</Button>
          :
          <Fragment>
            {!hasTranscript && (tour.max_member !== tour.confirm) ?
              <Button color="secondary" fullWidth variant="contained" onClick={() => {
                if (localStorage.getItem("user") === null) history.push('/login')
                else addTran()
              }}>เข้าร่วมทัวร์</Button> : ""}
            {!hasTranscript && (tour.max_member === tour.confirm) ?
              <Button disabled color="secondary" fullWidth variant="contained">{"ทัวร์เต็ม"}</Button> : ""}
            {hasTranscript && !transcript.confirm && !transcript.time ?
              <Button color="secondary" component={Link} to={`/createtranscript?tour=${transcript.tour}`} fullWidth variant="contained">แจ้งโอนเงิน</Button> : ""}
            {hasTranscript && !transcript.confirm && moment(transcript.time).unix() === 0 ?
              <Button color="secondary" component={Link} to={`/createtranscript?tour=${transcript.tour}`} fullWidth variant="contained">กรุณาแจ้งโอนเงินอีกครั้ง</Button> : ""}
            {hasTranscript && transcript.time && moment(transcript.time).unix() !== 0 && !transcript.confirm ?
              <Button disabled color="secondary" fullWidth variant="contained">{"รอการตรวจสอบ"}</Button> : ""}
            {hasTranscript && transcript.confirm ?
              <Button disabled color="secondary" fullWidth variant="contained">{"เข้าร่วมเรียบร้อย"}</Button> : ""}
          </Fragment>
        }
      </CardActions>
      {!ownerTour() ? <CardActions>
        <Button color="secondary" component={Link} to={`/messages/${tour.owner}?name=${tour.g_name}`} fullWidth variant="outlined">ติดต่อสอบถาม</Button>
      </CardActions> : ""}
    </Fragment>
  )
}

export default Info