import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTours, toursSelector } from "../slices/tours";
import { Tour } from "./Tour";
import { Typography } from "@material-ui/core";

const FavoriteTour = () => {
  const dispatch = useDispatch;

  useEffect(() => {
    dispatch(searchTours("?order=favorite&desc=true"));
  }, [dispatch]);

  const { tours, loading, hasErrors } = useSelector(toursSelector);

  const renderTours = () => {
    if (loading) return <Typography>กำลังโหลดข้อมูล...</Typography>;
    if (hasErrors) return <Typography>เกิดข้อผิดพลาดบางอย่าง...</Typography>;

    return tours && tours.map((tour) => <Tour key={tour.id} tour={tour} />);
  };

  return <Fragment>{renderTours()}</Fragment>;
};

export default FavoriteTour;
