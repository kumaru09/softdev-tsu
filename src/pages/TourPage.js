import React, { useEffect, Fragment, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Button,
  Card,
  CardMedia,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  List,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { tourSelector, fetchTour } from "../slices/tour";
import "moment/locale/th";
import Info from "../component/Info";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { fetchFavorite } from "../slices/favorite";
import { authHeader } from "../helpers/auth-header";
import { fetchTranscript } from "../slices/transcript";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { fetchComments, commentsSelector } from "../slices/comments";
import Comment from "../component/Comment";
import SendIcon from "@material-ui/icons/Send";
import { fetchReview } from "../slices/review";
import Rating from "@material-ui/lab/Rating";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  img: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  header: {
    marginTop: "1.5rem",
    marginBottom: "0.2rem",
  },
  root: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

const TourPage = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favoriteState = useSelector((state) => state.favorite.favorite);
  const {
    comments,
    loading: commentsLoading,
    hasErrors: commentsHasErrors,
  } = useSelector(commentsSelector);
  const review = useSelector((state) => state.review.review);
  const transcripts = useSelector((state) => state.transcript.transcript);
  const [value, setValue] = useState(0);
  const [input, setInput] = useState('')

  useEffect(() => {
    const { id } = match.params;
    dispatch(fetchTour(id));
    dispatch(fetchFavorite(id));
    dispatch(fetchTranscript(id));
    dispatch(fetchComments(id));
    dispatch(fetchReview(id));
  }, [dispatch, match]);

  const { tour, loading, hasError } = useSelector(tourSelector);

  const renderInfo = () => {
    if (loading) return "";
    if (hasError) return <p>เกิดข้อผิดพลาดบางอย่าง..</p>;

    return <Info tour={tour} addTran={addTran} ownerTour={ownerTour} />;
  };

  const renderComments = () => {
    if (commentsLoading) return <p>กำลังโหลดคอมเมนต์...</p>;
    if (commentsHasErrors) return <p>เกิดข้อผิดพลาดบางอย่าง..</p>;

    return (
      Array.isArray(comments) &&
      comments.map((comment) => (
        <Comment key={comment.time} comment={comment} />
      ))
    );
  };

  async function addFavor() {
    const { id } = match.params;
    let config = {
      method: "POST",
      headers: authHeader(),
    };
    try {
      const response = await fetch(
        `https://api.19991999.xyz/favorites/${id}`,
        config
      );
      const data = await response.json();
      console.log(data);
      dispatch(fetchFavorite(id));
    } catch (err) {
      console.log(err);
    }
  }

  async function addTran() {
    const { id } = match.params;
    let config = {
      method: "POST",
      headers: authHeader(),
    };
    try {
      const response = await fetch(
        `https://api.19991999.xyz/transcripts/${id}`,
        config
      );
      const data = await response.json();
      console.log(data);
      dispatch(fetchTranscript(id));
    } catch (err) {
      console.log(err);
    }
  }

  async function addReview(input, value) {
    let {id} = match.params
    Axios.post(`https://api.19991999.xyz/reviews/${id}`,{comment: input, ratting: value*20},{headers: authHeader()})
    .then(res => {
      console.log(res)
      dispatch(fetchComments(id));
      dispatch(fetchReview(id))
    })
    .catch(err => {
      console.log(err)
    })
  }

  const ownerTour = () => {
    if (localStorage.getItem("user") === null) return true
    else {
      let user = JSON.parse(atob(localStorage.getItem("user").split(".")[1]));
      if (user.user_id === tour.owner) return false;
      else return true;
    }
  };

  return (
    <Fragment>
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          alignItems="center"
          className={classes.header}
        >
          <Grid item xs>
            <Typography variant="h5" component="span">
              {tour.name}
            </Typography>
          </Grid>
          <Grid item>
            {ownerTour() ? (
              <Button
                disabled={favoriteState}
                fullWidth
                startIcon={<FavoriteBorderIcon />}
                onClick={() => {
                  addFavor();
                }}
                variant="outlined"
              >
                {favoriteState ? "ถูกใจแล้ว" : "ถูกใจ"}
              </Button>
            ) : (
              <Button
                startIcon={<EditIcon />}
                fullWidth
                variant="outlined"
                component={Link}
                to={`/edittour?tour=${tour.id}`}
              >
                แก้ไข
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <CardMedia
              className={classes.media}
              image={`https://api.19991999.xyz/pic/${tour.pic}`}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>{renderInfo()}</Card>
          </Grid>
        </Grid>
      </Container>
      <section style={{ backgroundColor: "#f0f4f9", marginTop: "2.0rem" }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Description
          </Typography>
          <Grid container spacing={4} direction="column">
            <Grid item xs>
              {tour.description}
            </Grid>
            <Grid item xs>
              <Divider variant="fullWidth" />
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="">{tour.g_name && tour.g_name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={tour.g_name+" "+tour.g_surname}
                   />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Container maxWidth="md">
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <Typography variant="h4">รีวิว</Typography>
          </Grid>
          <Grid item xs>
            <List>{renderComments()}</List>
          </Grid>
          {(ownerTour() && !review) && transcripts.confirm ? (
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  placeholder="พิมพ์รีวิว.."
                  id="sendicon"
                  value={input}
                  onChange={(e) => {setInput(e.target.value)}}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => {addReview(input, value)}}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl><Typography variant="subtitle1">{"คะแนน: "}</Typography>
              <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              </Box>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default TourPage;
