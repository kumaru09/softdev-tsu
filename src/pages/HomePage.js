import React, { useEffect } from "react";
import CardTrip from "../component/CardTrip"
import { Container, Typography, Grid, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours, toursSelector } from "../slices/tours";
import { Tour } from "../component/Tour";


const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTours())

  }, [dispatch])

  const { tours, loading, hasError } = useSelector(toursSelector) 

  return (
    <div>
      <Paper>
        <img src="https://source.unsplash.com/random" alt="..." />
      </Paper>
      <Container maxWidth="md">
        <div style={{marginTop: "3rem"}}>
          <Typography variant="h4" gutterBottom>
            {"ทริปแนะนำ"}
          </Typography>
          <Grid container spacing={3}>
              <CardTrip />
              <CardTrip />
              <CardTrip />
          </Grid>
        </div>
        <div style={{marginTop: "3rem"}}>
          <Typography variant="h4" gutterBottom>
            {"ทริปยอดนิยม"}
          </Typography>
          <Grid container spacing={1} direction="column">
          {tours.map(tour => <Tour key={tour.id} tour={tour}  />)}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
