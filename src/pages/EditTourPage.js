import React from "react";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  MenuItem,
  Button,
  Container,
  Paper,
  Select,
  FormControl,
  InputLabel,
  Input,
  Chip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { withFormik } from "formik";
import moment from "moment";
import "moment/locale/th";
import MomentUtils from "@date-io/moment";
import { connect } from "react-redux";
import { addTour } from "../slices/addtour";
import Axios from "axios";
import { authHeader } from "../helpers/auth-header";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: "red",
    fontSize: "1.0rem",
    marginTop: "0.2rem",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    color: "#745c97",
    fontWeight: "bold",
    letterSpacing: "0.5rem",
  },
  border: {
    border: "0.15rem solid #26c6da",
    borderRadius: "2px",
    padding: "2%",
    width: "25rem",
    textAlign: "center",
  },
}));

const tourCategory = [
  {
    value: "History",
    label: "History",
  },
  {
    value: "Relax",
    label: "Relax",
  },
  {
    value: "Temple",
    label: "Temple",
  },
  {
    value: "ช้อปปิ้ง",
    label: "ช้อปปิ้ง"
  },
  {
    value: "อาหาร",
    label: "อาหาร"
  },
  {
    value: "ออกกำลังกาย",
    label: "ออกกำลังกาย"
  },
  {
    value: "เดินเล่น",
    label: "เดินเล่น"
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

moment.locale("th");

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
  } = props;

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <div className={classes.logo}>
              <div className={classes.border}>EDIT TOUR</div>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Input
                    id="picture"
                    name="picture"
                    placeholder="Picture:"
                    type="file"
                    variant="outlined"
                    onChange={(e) => { props.setFieldValue("picture", e.currentTarget.files[0]) }}
                    error={touched.picture && errors.picture ? true : false}
                  />
                  {errors.picture && touched.picture && (
                    <p className={classes.errorMessage}>{errors.picture}</p>
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="tourname"
                    name="tourname"
                    label="ชื่อทัวร์"
                    value={values.tourname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tourname && errors.tourname ? true : false}
                    fullWidth
                  />
                  {errors.tourname && touched.tourname && (
                    <p className={classes.errorMessage}>{errors.tourname}</p>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={touched.category && errors.category ? true : false}
                  >
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                      label="category"
                      value={values.category}
                      onChange={handleChange("category")}
                    >
                      {tourCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category && errors.category && (
                      <p className={classes.errorMessage}>{errors.category}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    fullWidth
                    freeSolo
                    defaultValue={[]}
                    options={topdestination.map((option) => option.place)}
                    onChange={(_, value) => props.setFieldValue("destination", value)}
                    name="destination"
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="destination"
                        variant="standard"
                        label="สถานที่"
                        name="destination"
                        placeholder="สถานที่"
                        error={
                          touched.destination && errors.destination
                            ? true
                            : false
                        }
                      />
                    )}
                  />
                  {touched.destination && errors.destination && <p className={classes.errorMessage}>{errors.destination}</p>}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="person"
                    label="จำนวนคนเข้าร่วม"
                    value={values.person}
                    onChange={handleChange}
                    fullWidth
                    error={touched.person && errors.person ? true : false}
                  />
                  {touched.person && errors.person && (
                    <p className={classes.errorMessage}>{errors.person}</p>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="ค่าใช้จ่าย"
                    value={values.price}
                    onChange={handleChange}
                    error={touched.price && errors.price ? true : false}
                    helperText="ถ้าไม่มีค่าใช้จ่ายใส่ 0"
                  />
                  {touched.price && errors.price && (
                    <p className={classes.errorMessage}>{errors.price}</p>
                  )}
                </Grid>
                <MuiPickersUtilsProvider
                  libInstance={moment}
                  utils={MomentUtils}
                >
                  <Grid item xs={12} md={6}>
                    <KeyboardDateTimePicker
                      fullWidth
                      disablePast
                      ampm={false}
                      value={values.startDate}
                      onChange={(value) =>
                        props.setFieldValue("startDate", moment(value).toJSON())
                      }
                      label="วันเวลาเริ่ม"
                      format="DD/MM/YYYY kk:mm"
                      error={
                        touched.startDate && errors.startDate ? true : false
                      }
                    />
                    {touched.startDate && errors.startDate && (
                      <p className={classes.errorMessage}>{errors.startDate}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <KeyboardDateTimePicker
                      fullWidth
                      ampm={false}
                      value={values.endDate}
                      format="DD/MM/YYYY kk:mm"
                      onChange={(value) =>
                        props.setFieldValue("endDate", moment(value).toJSON())
                      }
                      minDate={values.startDate}
                      label="วันเวลาจบ"
                      error={touched.endDate && errors.endDate ? true : false}
                    />
                    {touched.endDate && errors.endDate && (
                      <p className={classes.errorMessage}>{errors.endDate}</p>
                    )}
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    values={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rowsMax={20}
                    fullWidth
                    error={
                      touched.description && errors.description ? true : false
                    }
                  />
                  {touched.description && errors.description && (
                    <p className={classes.errorMessage}>{errors.description}</p>
                  )}
                </Grid>
                <Grid container item xs={12}>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                  >
                    แก้ไขทัวร์
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const form = withFormik({
  mapPropsToValues: ({
    picture,
    tourname,
    category,
    description,
    destination,
    person,
    price,
    startDate,
    endDate,
  }) => {
    return {
      picture: picture || "",
      tourname: tourname || "",
      category: category || "",
      description: description || "",
      destination: [],
      person: person || "",
      price: price || "",
      startDate: startDate || null,
      endDate: endDate || null,
    };
  },
  validationSchema: yup.object().shape({
    tourname: yup
      .string()
      .required("This field is required")
      .min(5, "Please enter at least 5 characters")
      .max(200, "Please Enter less then 200 letters"),

    price: yup
      .string()
      .required("This field is required")
      .matches(/[0-9]+$/, "Please enter only number")
      .max(6, "Please enter at least 6 characters"),
    person: yup
      .string()
      .required("This field is required")
      .matches(/[0-9]+$/, "Please enter only number")
      .max(4, "Please enter at least 4 characters"),

    description: yup
      .string()
      .required("This field is required")
      .min(10, "Please enter at least 10 characters")
      .max(1000, "Please Enter less then 1000 letters"),
    category: yup.string().required("This field is required"),
    startDate: yup.date().required("This field is required").nullable(),
    endDate: yup.date().min(yup.ref('startDate'), "วันเวลาจบต้องมากกว่าวันเวลาเริ่ม").required("This field is required").nullable(),
    picture: yup.string().required("This field is required"),
    destination: yup.string().required("This field is required"),
  }),
  handleSubmit: async (values, { props, setFieldValue, setSubmitting }) => {
    // submit to the server
    setSubmitting(true);
    setFieldValue(values);
    const destinationID = []
    await values.destination.forEach((value) => {
      Axios.get(`https://api.19991999.xyz/places/?name=${value}`, { headers: authHeader() })
        .then(res => {
          if (res.data === null) {
            Axios.post('https://api.19991999.xyz/places/', { name: value, lat: 0, lon: 0 }, { headers: authHeader() })
              .then(res => {
                console.log(res.data)
                destinationID.push(res.data.id)
                console.log(destinationID)
              })
              .catch(err => {
                console.log(err)
              })
          }
          else {
            destinationID.push(res.data[0].id)
            console.log(destinationID)
          }

        })
        .then(() => {
          props.dispatch(addTour(values, destinationID))
        })
        .catch(err => {
          console.log(err)
        })
    })
    console.log(values)
  },
})(TourForm);

const addTourForm = connect()(form)

export default addTourForm;
