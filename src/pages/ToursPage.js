import React, { useEffect, useState } from "react";
import { Tour } from "../component/Tour";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
  List,
  CardHeader,
  Card,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { searchTours, toursSelector } from "../slices/tours";

const tourCategory = [
  { value: null, label: "All" },
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
  root: {
    marginTop: "2rem",
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    color: 'white'
  },
}));
const ToursPage = ({ location }) => {
  const classes = useStyle()
  const { tours, loading, hasErrors } = useSelector(toursSelector);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [inputCat, setInputCat] = useState("");
  const search = new URLSearchParams(location.search).get("search");
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    dispatch(searchTours({ search, category }));
  }, [dispatch, location, search, category]);

  const renderSeacrh = () => {
    if (loading) return <Typography>กำลังโหลดข้อมูล...</Typography>
    if (hasErrors) return <Typography>เกิดข้อผิดพลาดบางอย่าง...</Typography>
    if (!tours) return <Typography>ไม่ค้นพบทัวร์ที่ต้องการค้นหา...</Typography>;

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
                setInputCat(event.target.value);
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
            to={`/tours?${input ? "search=" + input : ""}${input && inputCat ? "&" : ""}${inputCat ? "category=" + inputCat : ""}`}
          >
            ค้นหา
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.root}>
        <Card>
          <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5">ค้นหา: {search}</Typography>}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <List>
                {renderSeacrh()}
              </List>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default ToursPage;
