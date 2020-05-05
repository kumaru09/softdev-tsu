import React, { useEffect, useState } from "react";
import CardTrip from "../component/CardTrip";
import {
  Container,
  Typography,
  Grid,
  Paper,
  InputBase,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours, toursSelector, searchTours } from "../slices/tours";
import { Tour } from "../component/Tour";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
  header: {
    position: "absolute",
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: 'cover',
    width: '100%'
  },
  paper: {},
}));

const HomePage = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [input, setInput] = useState('')

  useEffect(() => {
    dispatch(searchTours());

  }, [dispatch]);

  const { tours, loading, hasError } = useSelector(toursSelector);

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: "url(https://source.unsplash.com/random)" }}
    >
      {
        <img
          style={{ display: "none" }}
          src="https://source.unsplash.com/random"
          alt="..."
        />
      }
      <Container maxWidth="md">
        <Grid container justify="center">
          <Grid item md={6}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1" gutterBottom>
                ไปเที่ยวกัน
              </Typography>
              <IconButton
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="สถานที่"
                inputProps={{ "aria-label": "ค้นหาสถานที่" }}
                onChange={(event) => {setInput(event.target.value)}}
              />
              <Button color="primary" variant="contained" component={Link} to={`/tours?search=${input}`}>
                ค้นหา
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ marginTop: "3rem" }}>
          <Typography variant="h4" gutterBottom>
            {"ทริปแนะนำ"}
          </Typography>
          <Grid container spacing={3}>
            <CardTrip />
            <CardTrip />
            <CardTrip />
          </Grid>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <Typography variant="h4" gutterBottom>
            {"ทริปยอดนิยม"}
          </Typography>
          <Grid container spacing={1} direction="column">
            {tours && tours.map((tour) => (
              <Tour key={tour.id} tour={tour} />
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
