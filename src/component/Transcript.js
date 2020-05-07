import React, { Fragment } from "react";
import {
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ImageIcon from '@material-ui/icons/Image';

const Transcripts = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      {console.log(moment(props.transcript.time).format())}
      <ListItem>
        <ListItemText
          primary={props.transcript.name + " " + props.transcript.surname}
          secondary={
            <Fragment>
              {props.transcript.confirm ? "เข้าร่วมเรียบร้อย" : ""}
              {moment(props.transcript.time).format() === moment(0).format() ||
              !props.transcript.time
                ? "รอการแจ้งโอน"
                : ""}
              {moment(props.transcript.time).format() !== moment(0).format() &&
              !props.transcript.confirm &&
              props.transcript.time
                ? moment(props.transcript.time).format("L LT")
                : ""}
            </Fragment>
          }
        />
        {!props.transcript.confirm && (
          <ListItemSecondaryAction>
            <IconButton onClick={() => setOpen(true)}>
                <ImageIcon />
            </IconButton>
            <IconButton
              disabled={
                !props.transcript.time ||
                moment(props.transcript.time).format() === moment(0).format()
              }
              edge="end"
              onClick={() => {
                props.confirmTour(props.transcript.user, true);
              }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              disabled={
                !props.transcript.time ||
                moment(props.transcript.time).format() === moment(0).format()
              }
              edge="end"
              onClick={() => {
                props.confirmTour(props.transcript.user, false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider variant="fullWidth" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Transcript"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <img src={`https://api.19991999.xyz/pic/${props.transcript.file}`} alt="" />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Transcripts;
