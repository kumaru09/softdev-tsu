import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import moment from "moment/moment";

export const Message = ({ message }) => (
  <Grid container>
    <Grid item>
      <Avatar>S</Avatar>
    </Grid>
    <Grid item>
      <Typography>{message.message}</Typography>
      <Typography>
        {moment
          .utc(message.time)
          .calendar(null, {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "DD/MM/YYYY",
          })}
      </Typography>
    </Grid>
  </Grid>
);
