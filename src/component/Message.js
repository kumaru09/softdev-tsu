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

const Message = ({ message, name }) => {
  return (
    <Fragment>
    <Divider variant="inset" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="">{message.me ? "M" : name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Fragment>
              {message.me ? "คุณ " : `${name} `}
              <Typography component="span" variant="caption">
                {moment(message.time).calendar()}
              </Typography>
            </Fragment>
          }
          secondary={
            <Fragment>
              <Typography component="span" variant="body1" color="textPrimary">
                {message.message}
              </Typography>
            </Fragment>
          }
        />
      </ListItem>
    </Fragment>
  );
};

export default Message;
