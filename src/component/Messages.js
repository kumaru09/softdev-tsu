import React, { Fragment } from "react";
import {
  Avatar,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import moment from "moment/moment";
import { Link } from "react-router-dom";

export const Messages = ({ message }) => (
  <Fragment>
    <ListItem alignItems="flex-start" component={Link} to={`/messages/${message.contact}?name=${message.name}`} style={{color: '#000'}}>
      <ListItemAvatar>
        <Avatar alt="">{message.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Fragment>
            {message.name+" "}
            <Typography component="span" variant="caption">
              {moment(message.time).utc().calendar()}
            </Typography>
          </Fragment>
        }
        secondary={
          <Fragment>
          {message.me && "คุณ: "}
          <Typography component="span" variant="body1" color="textPrimary">
            {message.message}
          </Typography>
          </Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" />
  </Fragment>
);
