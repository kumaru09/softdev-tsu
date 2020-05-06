import React, { Fragment } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import moment from 'moment'

const Comment = props => {
    return (
        <Fragment>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="">{props.comment.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Fragment>
            {props.comment.name+" "+props.comment.surname+" "}
            <Typography component="span" variant="caption">
              {moment(props.comment.time).format('L')}
            </Typography>
            <Rating name="read-only" value={props.comment.ratting/20} size="small" readOnly />
          </Fragment>
        }
        secondary={
          <Fragment>
          <Typography component="span" variant="body1" color="textPrimary">
            {props.comment.comment}
          </Typography>
          </Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" />
  </Fragment>
    )
}

export default Comment