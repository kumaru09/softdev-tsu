import React from "react";
import CardTrip from "../component/CardTrip"
import { Container, Typography, Grid, Paper } from "@material-ui/core";

const HomePage = () => {
  return (
    <div>
      <Paper>
        <img src="https://source.unsplash.com/random" alt="..." />
      </Paper>
      <Container maxWidth="md">
        <div style={{marginTop: "3rem"}}>
          <Typography variant="h3" gutterBottom>
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
            {"สถานที่ยอดนิยม"}
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
