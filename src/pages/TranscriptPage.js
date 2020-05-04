import React from "react";
import * as yup from "yup";
import { withFormik } from "formik";
import { Grid, Button, TextField, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/th";
import MomentUtils from "@date-io/moment";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 5rem",
    padding: "0 7rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
    marginTop: "auto",
    width: "100%",
  },

  textField: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  textRoot: {
    margin: "-1rem 0 2rem 0",
    padding: "0 7rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
    marginTop: "auto",
  },

  errorMessage: {
    color: "red",
    fontSize: "1.0rem",
    marginTop: "0.2rem",
  },

  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    color: "#000000",
    fontWeight: "bold",
    letterSpacing: "0.5rem",
  },

  border: {
    border: "0.15rem solid #2e84d5",
    borderRadius: "2px",
    padding: "2%",
    width: "19rem",
    textAlign: "center",
  },

  topLayout: {
    padding: "2rem",
    [theme.breakpoints.up("md")]: {
      margin: "1rem 0",
    },
  },

  instruction: {
    marginTop: theme.spacing(1),
    marginButtom: theme.spacing(1),
  },

  buttonLayout: {
    width: "100%",
    marginLeft: "30rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
    },
  },
}));

const TranscriptPage = (props) => {
  const classes = useStyles();
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = props;

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.topLayout}
      >
        <Grid item md={11} xs={11}>
          <div className={classes.logo}>
            <div className={classes.border}>แจ้งโอนเงิน</div>
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <form onSubmit={handleSubmit}>
            <div className={classes.instruction}>
              <div className={classes.textRoot}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item md={12} xs={12}>
                    <TextField
                      id="transcript"
                      name="transcript"
                      placeholder="Transcript:"
                      type="file"
                      margin="normal"
                      variant="outlined"
                      onChange={(e) => {props.setFieldValue("transcript", e.currentTarget.files[0])}}
                      helperText={touched.transcript ? errors.transcript : ""}
                      error={touched.transcript && Boolean(errors.transcript)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                    >
                      <KeyboardDateTimePicker
                        ampm={false}
                        format="DD/MM/YYYY kk:mm"
                        id="transferDateTime"
                        name="transferDateTime"
                        label="วันเวลาที่โอนเงิน"
                        className={classes.textField}
                        value={values.transferDateTime}
                        onChange={(value) =>
                          props.setFieldValue("transferDateTime", moment(value).toJSON())
                        }
                        helperText={
                          touched.transferDateTime
                            ? errors.transferDateTime
                            : ""
                        }
                        error={
                          touched.transferDateTime &&
                          Boolean(errors.transferDateTime)
                        }
                        KeyboardButtonProps={{ "aria-label": "change date" }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </div>
            </div>
            <Grid container item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

const transcriptForm = withFormik({
  mapPropsToValues: ({ transcript, transferDateTime }) => {
    return {
      transcript: transcript || "",
      transferDateTime: transferDateTime || null,
    };
  },

  validationSchema: yup.object().shape({
    transcript: yup.string().required("This field is required"),

    transferDateTime: yup.string().required("This field is required").nullable(),
  }),

  handleSubmit: (values, { props, setFieldValue, setSubmitting }) => {
    setSubmitting(true);
    setFieldValue(values);
    console.log(values)
  },
})(TranscriptPage);

const mapTranscriptForm = connect()(transcriptForm)

export default mapTranscriptForm;
