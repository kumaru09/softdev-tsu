import React, { useEffect, useState } from "react";
import { Tour } from "../component/Tour";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { searchTours } from "../slices/tours";

const ToursPage = ({ location }) => {
  const tours = useSelector((state) => state.tours.tours);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(location.search).get("search");

    dispatch(searchTours(search))
  },[dispatch, location]);

  const renderSeacrh = () => {
      if (!tours) return <p>ไม่ค้นพบทัวร์ที่ต้องการค้นหา...</p>

      return tours.map((tour) => (
        <Tour key={tour.id} tour={tour} />
      ))
  }
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="สถานที่"
            inputProps={{ "aria-label": "ค้นหาสถานที่" }}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to={`/tours?search=${input}`}
          >
            ค้นหา
          </Button>
        </Grid>
        <Grid item>
        {renderSeacrh()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToursPage;
