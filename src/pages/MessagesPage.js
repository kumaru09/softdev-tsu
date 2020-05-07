import React, { useEffect } from "react";
import { Messages } from "../component/Messages";
import {
  Container,
  List,
  Typography,
  makeStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../slices/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
  },
}));

const MessagePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const messages = useSelector((state) => state.messages.messages);

  const renderMessages = () => {
    if (!messages) return <Typography>ไม่มีข้อความ...</Typography>;

    return messages.map((message) => (
      <Messages key={message.contact} message={message} />
    ));
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" className={classes.root}>
        <Card>
          <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5">กล่องข้อความ</Typography>}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <List>{renderMessages()}</List>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default MessagePage;
