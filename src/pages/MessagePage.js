import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage } from "../slices/message";
import {
  Container,
  Grid,
  makeStyles,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Card,
  CardActions,
  Divider,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import Message from "../component/Message";
import SendIcon from "@material-ui/icons/Send";
import Axios from "axios";
import { authHeader } from "../helpers/auth-header";

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
  const [input, setInput] = useState('')

  useEffect(() => {
    const { contact } = match.params;

    dispatch(fetchMessage(contact));
  }, [dispatch, match]);

  const chat = useSelector((state) => state.message.message);

  const renderMessage = () => {
    if (!chat) return <Typography>ไม่มีข้อความ...</Typography>;

    return chat.map((message) => (
      <Message
        key={message.time}
        message={message}
        name={message.me ? "" : name}
      />
    ));
  };

  async function addMessage(input) {
    let { contact } = match.params;
    Axios.post(`https://api.19991999.xyz/messages/${contact}`,{ message: input},{headers: authHeader()})
    .then(res => {
      console.log(res)
      dispatch(fetchMessage(contact));
    })
    .catch(err => {
      console.log(err)
    })
  }

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
                  value={input}
                  onChange={(e) => {setInput(e.target.value)}}
                  endAdornment={
                    <InputAdornment position="end">
                    <IconButton onClick={() => addMessage(input)}>
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
