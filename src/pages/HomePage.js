import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  InputBase,
  IconButton,
  makeStyles,
  Button,
  AppBar,
  Tabs,
  Tab,
  Box,
  List,
  Card,
  CardContent,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { searchTours, toursSelector } from "../slices/tours";
import { Tour } from "../component/Tour";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
  header: {
    position: "relative",
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "30vw",
    minHeight: "300px",
  },
  paper: {
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      width: "30rem",
    },
    marginTop: "5rem",
    margin: "auto",
  },
  root: {
    marginTop: "4rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const HomePage = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(searchTours("?order=id&desc=true"));
  }, [dispatch]);

  const { tours, loading, hasErrors } = useSelector(toursSelector);

  const renderTours = () => {
    if (loading) return <Typography>กำลังโหลดข้อมูล...</Typography>
    if (hasErrors) return <Typography>เกิดข้อผิดพลาดบางอย่าง...</Typography>

    return tours && tours.map((tour) => <Tour key={tour.id} tour={tour} />)
  }

  const tabTour = (search) => {
    dispatch(searchTours(search))
  }

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
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1" gutterBottom>
                ไปเที่ยวกัน
              </Typography>
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                width="15rem"
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Card component="div" className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab onClick={() => tabTour("?order=id&desc=true")} label="ทัวร์ล่าสุด" {...allyProps(0)} />
              <Tab onClick={() => tabTour("?order=favorite&desc=true")} label="ทัวร์ยอดนิยม" {...allyProps(1)} />
              <Tab onClick={() => tabTour("?order=confirm&desc=true")} label="ทัวร์ฮิต" {...allyProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <CardContent>
              <List>
                {renderTours()}
              </List>
            </CardContent>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardContent>
              <List>
                {renderTours()}
              </List>
            </CardContent>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CardContent>
              <List>
                {renderTours()}
              </List>
            </CardContent>
          </TabPanel>
        </Card>
      </Container>
    </div>
  );
};

export default HomePage;
