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
  useTheme,
  AppBar,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { searchTours } from "../slices/tours";
import { Tour } from "../component/Tour";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

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

  paper: {
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
      width: '20rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem'
    },
    marginTop: '5rem',
    margin: 'auto',
  },

  tabPanelLayout: {
    backgroundColor: '#ffffff',
    width: 1000,
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
     {...other}>
       {value === index && (
         <Box p={3}>
           <Typography>{children}</Typography>
         </Box>
       )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const HomePage = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const theme = useTheme();
  const [ value, setValue ] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    dispatch(searchTours());

  }, [dispatch]);

  const tours = useSelector(state => state.tours.tours)

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
              <IconButton
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                width="15rem"
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
            <div className={classes.tabPanelLayout}>
              <AppBar position="static" color="default">
                <Tabs
                 value={value}
                 onChange={handleChange}
                 indicatorColor="primary"
                 textColor="primary"
                 variant="fullWidth"
                 aria-label="full width tab recommended trip" >
                  <Tab label="History" {...allyProps(0)} />
                  <Tab label="Relax" {...allyProps(1)} />
                  <Tab label="Temple" {...allyProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={value}
               onChangeIndex={handleChangeIndex} >
                 <TabPanel value={value} index={0} dir={theme.direction}>
                   <Grid container spacing={3}>
                    <CardTrip />
                    <CardTrip />
                    <CardTrip />
                   </Grid>
                 </TabPanel>
                 <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid container spacing={3}>
                    <CardTrip />
                    <CardTrip />
                    <CardTrip />
                  </Grid>
                 </TabPanel>
                 <TabPanel value={value} index={2} dir={theme.direction}>
                  <Grid container spacing={3}>
                    <CardTrip />
                    <CardTrip />
                    <CardTrip />
                   </Grid>
                 </TabPanel>
              </SwipeableViews>
            </div>
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
