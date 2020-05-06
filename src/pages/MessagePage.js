import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage } from "../slices/message";
import {
  Container,
  Grid,
  TextField,
  makeStyles,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Card,
  CardActions,
  Divider,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import Message from "../component/Message";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const MessagePage = ({ match, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const name = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    const { contact } = match.params;

    dispatch(fetchMessage(contact));
  }, [dispatch, match]);

  const chat = useSelector((state) => state.message.message);

  const renderMessage = () => {
    if (!chat) return <p>ไม่มีข้อความ...</p>;

    return chat.map((message) => (
      <Message
        key={message.time}
        message={message}
        name={message.me ? "" : name}
      />
    ));
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Card>
          <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5">{name}</Typography>}
              avatar={<Avatar className={classes.avatar}>{name[0]}</Avatar>}
            />
          </Grid>
          <Grid item xs>
          <CardContent>
            <Grid container direction="column-reverse">
            {renderMessage()}</Grid></CardContent>
          </Grid>
          <Grid item xs={12}>
            <Divider variant="fullWidth" />
            <CardActions>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    placeholder="พิมพ์ข้อความ.."
                  id="sendicon"
                  endAdornment={
                    <InputAdornment position="end">
                    <IconButton>
                      <SendIcon />
                    </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </CardActions>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default MessagePage;
