import React, { Fragment } from "react";
import { useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-1rem 0 2rem",
    padding: "0 7rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
    marginTop: "auto",
  },
  input: {
    display: "none",
  },
  textField: {
    width: "90%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  autoComplete: {
    width: "90%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },

  errorMessage: {
    color: "red",
    fontSize: "1.0rem",
    marginTop: "0.2rem",
  },
}));

const checkNumberOnly = /[0-9]+$/;
const tripFormschema = yup.object().shape({
  tripname: yup
    .string()
    .required("This field is required")
    .min(5, "Please enter at least 5 characters"),
  price: yup
    .string()
    .required("This field is required")
    .matches(/[0-9]+$/, "Please enter only number"),
  person: yup
    .string()
    .required("This field is required")
    .matches(/[0-9]+$/, "Please enter only number"),
  description: yup
    .string()
    .required("This field is required")
    .min(10, "Please enter at least 10 characters"),
  guidename: yup.string().required("This field is required"),
  accname: yup.string().required("This fileld is required"),
  accno: yup
    .string()
    .required("This field is required")
    .matches(checkNumberOnly, "Pleaase enter only number")
    .min(10, "Please enter 10 digit")
    .max(12, "Please enter 10 digit"),
});

export default function TourForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: tripFormschema,
  });
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handlestartDateChange = (date) => {
    setstartDate(date);
  };
  const handleendDateChange = (date) => {
    setEndDate(date);
  };
  const onSubmit = (values) => {
    console.log(values);
    alert(JSON.stringify(values));
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container direction="row" spacing={0}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              id="picture"
              name="picture"
              type="file"
              accept="image/*"
              inputRef={register}
            />
            <Grid container spacing={3}>
              <Grid container item xs={12} spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    id="tripname"
                    name="tripname"
                    label="Tripname"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.tripname ? true : false}
                    helperText={errors.tripname ? errors.tripname.message : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="guidename"
                    name="guidename"
                    label="Guidename"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.guidename ? true : false}
                    helperText={
                      errors.guidename ? errors.guidename.message : ""
                    }
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    id="category"
                    name="category"
                    select
                    label="Category:"
                    variant="outlined"
                    inputRef={register({ required: true })}
                    error={!!errors.category ? true : false}
                    helperText={
                      errors.category
                        ? errors.category.message
                        : "Please select category"
                    }
                  >
                    <MenuItem value="history">History</MenuItem>
                    <MenuItem value="relax">Relax</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.description ? true : false}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                    multiline
                    rowsMax={10}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={5}>
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    name="destination"
                    className={classes.autoComplete}
                    inputRef={register}
                    options={topdestination}
                    getOptionLabel={(option) => option.place}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>{option.place}</React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="destination"
                        variant="standard"
                        label="Destination"
                        placeholder="destinations"
                        inputRef={register}
                        error={!!errors.destination ? true : false}
                        helperText={
                          errors.destination ? errors.destination.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="person"
                    name="person"
                    label="Person"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.person ? true : false}
                    helperText={errors.person ? errors.person.message : ""}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    id="price"
                    name="price"
                    label="Price"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.price ? true : false}
                    helperText={errors.price ? errors.price.message : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="bank"
                    name="bank"
                    label="Bank:"
                    select
                    variant="outlined"
                    inputRef={register}
                    helperText={"Please select bank"}
                  >
                    <MenuItem value="Kasikorn">Kasikorn</MenuItem>
                    <MenuItem value="SCB">SCB</MenuItem>
                    <MenuItem value="KMA">KMA</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={5}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <KeyboardDatePicker
                        required
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyy"
                        margin="normal"
                        id="startDate"
                        name="startDate"
                        label="Start Date"
                        minDate={new Date()}
                        value={startDate}
                        inputRef={register}
                        onChange={handlestartDateChange}
                        error={!!errors.startdate ? true : false}
                        helperText={
                          errors.startdate ? errors.startdate.message : ""
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="accname"
                    name="accname"
                    label="AccName"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.accname ? true : false}
                    helperText={errors.accname ? errors.accname.message : ""}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={5}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyy"
                        margin="normal"
                        name="endDate"
                        label="End Date"
                        minDate={startDate}
                        value={endDate}
                        onChange={handleendDateChange}
                        inputRef={register}
                        error={!!errors.enddate ? true : false}
                        helperText={
                          errors.enddate ? errors.enddate.message : ""
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="accno"
                    name="accno"
                    label="Accno"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputRef={register}
                    error={!!errors.accno ? true : false}
                    helperText={errors.accno ? errors.accno.message : ""}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" alignment>
              Create trip
            </Button>
          </form>
        </Grid>
      </div>
    </Fragment>
  );
}

const topdestination = [
  { place: "วัดพระแก้ว" },
  { place: "Ayutthaya" },
  { place: "park" },
  { place: "bangkok" },
  { place: "wat pho" },
  { place: "wat jang" },
  { place: "pattaya" },
  { place: "chonburi" },
  { place: "chaing mai" },
  { place: "nonthaburi" },
  { place: "trat" },
];
