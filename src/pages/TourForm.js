import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, MenuItem, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: " 0 5rem",
    padding: "0 7rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
    marginTop: "auto",
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

const bankCategory = [
  {
    value: "kasikorn",
    label: "Kasikorn",
  },
  {
    value: "SCB",
    label: "SCB",
  },
  {
    value: "krungthai",
    label: "Krungthai",
  },
];
const topdestination = [
  { place: "วัดพระแก้ว" },
  { place: "อยุธยา" },
  { place: "วัดโพธิ์" },
  { place: "วัดแจ้ง" },
  { place: "สยาม" },
  { place: "ตลาดนัดรถไฟ" },
  { place: "จตุจักร" },
  { place: "ท่ามหาราช" },
  { place: "ตลาดพลู" },
  { place: "ท้องฟ้าจำลอง" },
  { place: "เยาวราช" },
  { place: "ตลาดนัดวังหลัง" },
];

const checkNumberOnly = /[0-9]+$/;

const TourForm = (props) => {
  const classes = useStyles();
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <div classes={classes.root}>
      <Grid container direction="row" spacing={0}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="picture"
            placeholder="Picture:"
            type="file"
            accept="image/*"
            margin="normal"
            variant="outlined"
            values={values.picture}
            onChange={handleChange}
            helperText={touched.picture ? errors.picture : ""}
            error={touched.picture && Boolean(errors.picture)}
          />
          <Grid container justify="center" spacing={3}>
            <Grid container item xs={12} spacing={5}>
              <Grid item xs={6}>
                <TextField
                  id="tripname"
                  label="Tripname"
                  className={classes.textField}
                  value={values.tripname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.tripname ? errors.tripname : ""}
                  error={touched.tripname && Boolean(errors.tripname)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="guidename"
                  label="Guidename"
                  className={classes.textField}
                  value={values.guidename}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  variant="outlined"
                  helperText={touched.guidename ? errors.guidename : ""}
                  error={touched.guidename && Boolean(errors.guidename)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={5}>
              <Grid item xs={6}>
                <TextField
                  select
                  id="category"
                  label="Category:"
                  values={values.category}
                  onChange={handleChange("category")}
                  helperText={touched.category ? errors.category : ""}
                  error={touched.category && Boolean(errors.category)}
                  variant="outlined"
                  helperText={"Please select category"}
                >
                  {tourCategory.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="description"
                  label="Description"
                  values={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.description ? errors.description : ""}
                  error={touched.description && Boolean(errors.description)}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
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
                  values={values.destination}
                  onChange={(value) =>
                    props.setFieldValue("destination", value)
                  }
                  onBlur={handleBlur}
                  helperText={touched.destination ? errors.destination : ""}
                  error={touched.destinaton && Boolean(errors.destination)}
                  options={topdestination}
                  getOptionLabel={(option) => option.place}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>{option.place}</React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="destination"
                      variant="standard"
                      label="Destination"
                      placeholder="destinations"
                      values={values.destination}
                      onChange={(value) =>
                        props.setFieldValue("destination", value)
                      }
                      onBlur={handleBlur}
                      helperText={touched.destination ? errors.destination : ""}
                      error={touched.destinaton && Boolean(errors.destination)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="person"
                  label="Person"
                  className={classes.textField}
                  value={values.person}
                  onChange={handleChange}
                  helperText={touched.person ? errors.person : ""}
                  error={touched.person && Boolean(errors.person)}
                  margin="normal"
                  variant="outlined"
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
                  value={values.price}
                  onChange={handleChange}
                  helperText={touched.price ? errors.price : ""}
                  error={touched.price && Boolean(errors.price)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  id="bank"
                  name="bank"
                  label="Bank:"
                  values={values.bank}
                  onChange={handleChange("bank")}
                  helperText={touched.bank ? errors.bank : "Please select bank"}
                  error={touched.category && Boolean(errors.category)}
                  variant="outlined"
                >
                  {bankCategory.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={5}>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="startDate"
                      name="startDate"
                      label="Start Date"
                      className={classes.textField}
                      minDate={new Date()}
                      value={values.startDate}
                      onChange={(value) =>
                        props.setFieldValue("startDate", value)
                      }
                      helperText={touched.startDate ? errors.startDate : ""}
                      error={touched.startDate && Boolean(errors.startDate)}
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
                  value={values.accname}
                  onChange={handleChange}
                  helperText={touched.accname ? errors.accname : ""}
                  error={touched.accname && Boolean(errors.accname)}
                  margin="normal"
                  variant="outlined"
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
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="endDate"
                      name="endDate"
                      label="End Date"
                      className={classes.textField}
                      minDate={values.startDate}
                      value={values.endDate}
                      onChange={(value) =>
                        props.setFieldValue("endDate", value)
                      }
                      helperText={touched.endDate ? errors.endDate : ""}
                      error={touched.endDate && Boolean(errors.endDate)}
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
                  value={values.accno}
                  onChange={handleChange}
                  helperText={touched.accno ? errors.accno : ""}
                  error={touched.accno && Boolean(errors.accno)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end" item xs={12} spacing={5}>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                color="primary"
              >
                Create trip
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

const form = withFormik({
  mapPropsToValues: ({
    picture,
    tripname,
    guidename,
    category,
    description,
    destination,
    person,
    price,
    bank,
    startDate,
    accname,
    endDate,
    accno,
  }) => {
    return {
      picture: picture || "",
      tripname: tripname || "",
      guidename: guidename || "",
      category: category || "",
      description: description || "",
      destination: destination || "",
      person: person || "",
      price: price || "",
      bank: bank || "",
      startDate: startDate || null,
      accname: accname || "",
      endDate: endDate || null,
      accno: accno || "",
    };
  },
  validationSchema: yup.object().shape({
    tripname: yup
      .string()
      .required("This field is required")
      .min(5, "Please enter at least 5 characters"),
    guidename: yup.string().required("This field is required"),
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
    accname: yup.string().required("This fileld is required"),
    accno: yup
      .string()
      .required("This field is required")
      .matches(checkNumberOnly, "Pleaase enter only number")
      .min(10, "Please enter 10 digit")
      .max(12, "Please enter 10 digit"),
    category: yup.string().required("This field is required"),
    bank: yup.string().required("This field is required"),
    startDate: yup.string().required("This field is required"),
    endDate: yup.string().required("This field is required"),
    picture: yup.string().required("This field is required"),
    destination: yup.string().required("This field is required"),
  }),

  handleSubmit: (values, { setFieldValue, setSubmitting }) => {
    // submit to the server
    setSubmitting(true);
    setFieldValue(values);
  },
})(TourForm);

export default form;
