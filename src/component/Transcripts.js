import React, { Fragment } from 'react'
import { ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const Transcripts = props => {
  return (
    <Fragment>
      <ListItem>
        <ListItemText
          primary={props.transcript.name}
          secondary={<Fragment>
            {props.transcript.time && moment(props.transcript.time).format() !== moment(0).format() && !props.transcript.confirm ?
              moment(props.transcript.time).format('L LT') + " อยู่ระหว่างการตวรจสอบ" : ""}
            {!props.transcript.time && "รอแจ้งโอนเงิน"}
            {props.transcript.time && props.transcript.confirm ? "เข้าร่วมเรียบร้อย" : ""}
            {moment(props.transcript.time).format() === moment(0).format() && !props.transcript.confirm ? "กรุณาแจ้งโอนเงินอีกครั้ง" : ""}
          </Fragment>}
        />
        <ListItemSecondaryAction>
          {moment(props.transcript.time).format() === moment(0).format() && !props.transcript.confirm ? <IconButton edge="end" component={Link} to={`/tours/${props.transcript.tour}`} >
            <AddIcon />
          </IconButton> : ""}
          {!props.transcript.confirm && !props.transcript.time ?
            <Fragment>
              <IconButton edge="end" component={Link} to={`/tours/${props.transcript.tour}`} >
                <AddIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => props.deleteTranscript(props.transcript.tour)}>
                <DeleteIcon />
              </IconButton>
            </Fragment> : ""}
          {props.transcript.confirm ? <CheckIcon /> : ""}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="fullWidth" />
    </Fragment>
  )
}

export default Transcripts