import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  makeStyles,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { searchTours, toursSelector } from "../slices/tours";
import { Tour } from "../component/Tour";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    marginBottom: "2rem"
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    color: 'white'
  },
}));

const MyTourPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tours, loading, hasErrors } = useSelector(toursSelector);

  useEffect(() => {
    let user = JSON.parse(atob(localStorage.getItem("user").split(".")[1]));
    dispatch(searchTours(`?owner=${user.user_id}`));
  }, [dispatch]);

  const renderMytour = () => {
    if (loading) return "";
    if (hasErrors) return <p>เกิดข้อผิดพลาดบางอย่าง...</p>;
    if (!tours) return <Grid item xs><Typography variant="body1">ไม่มีทัวร์ที่สร้างไว้...</Typography></Grid>

    return tours && tours.map((tour) => <Tour key={tour.id} tour={tour} />);
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Card>
          <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5"> ทัวร์ของฉัน</Typography>}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <Grid container spacing={1} direction="column">
                {renderMytour()}
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default MyTourPage;
