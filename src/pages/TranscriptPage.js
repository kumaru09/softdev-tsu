import React from 'react'
import * as yup from 'yup'
import { withFormik } from 'formik'

import { Grid, Button, TextField, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 5rem",
        padding: "0 7rem",
        [theme.breakpoints.down("xs")] : {
            padding: "0"
        },
        [theme.breakpoints.down("md")]: {
            padding: "0"
        },
        marginTop: "auto",
        width: '100%'
    },

    textField: {
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
    },

    textRoot: {
        margin: '-1rem 0 2rem 0',
        padding: '0 7rem',
        [theme.breakpoints.down('xs')]: {
            padding: '0'
        },
        [theme.breakpoints.down('md')]: {
            padding: '0'
        },
        marginTop: 'auto'
    },

    errorMessage: {
        color: "red",
        fontSize: "1.0rem",
        marginTop: "0.2rem"
    },

    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem',
        color: '#000000',
        fontWeight: 'bold',
        letterSpacing: '0.5rem'
    },

    border: {
        border: '0.15rem solid #2e84d5',
        borderRadius: '2px',
        padding: '2%',
        width: '19rem',
        textAlign: 'center'
    },

    topLayout: {
        padding: '2rem',
        [theme.breakpoints.up('md')]: {
            margin: '1rem 0'
        }
    },

    instruction: {
        marginTop: theme.spacing(1),
        marginButtom: theme.spacing(1)
    },

    buttonLayout: {
        width: '100%',
        marginLeft: '30rem',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0'
        }
    },
}));

const checkNumberOnly = /^[0-9]+$/;

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

    return(
      <Container maxWidth="md">
        <Grid container direction="row" justify="center" alignItems="center" className={classes.topLayout}>
          <Grid item md={11} xs={11}>
            <div className={classes.logo}>
              <div className={classes.border}>
                  แจ้งโอนเงิน
              </div>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <form onSubmit={handleSubmit}>
              <div className={classes.instruction}>
                <div className={classes.textRoot}>
                  <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item md={12} xs={12}>
                      <TextField 
                        id="transcript"
                        placeholder="Transcript:"
                        type="file"
                        accept="image/*"
                        margin="normal"
                        variant="outlined"
                        values={values.transcript}
                        onChange={handleChange}
                        helperText={touched.transcript ? errors.transcript : ""}
                        error={touched.transcript && Boolean(errors.transcript)} 
                        className={classes.textField} />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField 
                        id="money"
                        label="จำนวนเงินที่โอน"
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                        value={values.money}
                        onChange={handleChange}
                        helperText={touched.money ? errors.money : ""}
                        error={touched.money && Boolean(errors.money)} />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item md={12} xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker 
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="transferDate"
                          name="transferDate"
                          label="วันที่โอนเงิน"
                          className={classes.textField}
                          minDate={new Date()}
                          value={values.transferDate}
                          onChange={(value) => props.setFieldValue("transferDate", value)}
                          helperText={touched.transferDate ? errors.transferDate : ""}
                          error={touched.transferDate && Boolean(errors.transferDate)}
                          KeyboardButtonProps={{ "aria-label": "change date" }} />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker 
                          disableToolbar
                          variant="inline"
                          mask="__:__ _M"
                          margin="normal"
                          id="transferTime"
                          label="เวลาที่โอนเงิน"
                          name="transferTime"
                          className={classes.textField}
                          value={values.transferTime}
                          onChange={(value) => props.setFieldValue("transferTime", value)}
                          helperText={touched.transferTime ? errors.transferTime : ""}
                          error={touched.transferTime && Boolean(errors.transferTime)}
                          KeyboardButtonProps={{ "aria-label": "change date" }} />
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
                  fullWidth >
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
  mapPropsToValues: ({
    picture,
    money,
    transferDate,
    transferTime,
  }) => {
    return {
      picture: picture || "",
      money: money || "",
      transferDate: transferDate || null,
      transferTime: transferTime || null,
    };
  },

  validationSchema: yup.object().shape({
    picture: yup
      .string()
      .required('This field is required'),

    money: yup
      .string()
      .required('This field id required')
      .matches(checkNumberOnly, 'Please enter only number'),

    transferDate: yup
      .string()
      .required('This field is required'),

    transferTime: yup
      .string()
      .required('This field is required')
  }),

  handleSubmit: ( values, { setFieldValue, setSubmitting } ) => {
    setSubmitting(true);
    setFieldValue(values);
  }
})(TranscriptPage);

export default transcriptForm;