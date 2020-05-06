import React, { useEffect, useState } from "react";
import { Tour } from "../component/Tour";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Button,
  Input,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { searchTours } from "../slices/tours";

const tourCategory = [
  {
    value: "history",
    label: "History",
  },
  {
    value: "relax",
    label: "Relax",
  },
  {
    value: "temple",
    label: "Temple",
  },
];
const useStyle = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
  paper: {},
  formcontrol: {
    width: "40%",
  },
}));
const ToursPage = ({ location }) => {
  const classes = useState()
  const tours = useSelector((state) => state.tours.tours);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(location.search).get("search");

    dispatch(searchTours(`?search=${search}`));
  }, [dispatch, location]);

  const renderSeacrh = () => {
    if (!tours) return <p>ไม่ค้นพบทัวร์ที่ต้องการค้นหา...</p>;

    return tours.map((tour) => <Tour key={tour.id} tour={tour} />);
  };
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item md={8}>
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="สถานที่"
            inputProps={{ "aria-label": "ค้นหาสถานที่" }}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <FormControl variant="outlined" className={classes.formcontrol}>
            <InputLabel id="select-label">Category</InputLabel>
            <Select
              label="category"
              onChange={(event) => {
                setInput(event.target.value);
              }}
            >
              {tourCategory.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={`/tours?search=${input}`}
          >
            ค้นหา
          </Button>
        </Grid>
        <Grid item>{renderSeacrh()}</Grid>
      </Grid>
    </Container>
  );
};

export default ToursPage;
