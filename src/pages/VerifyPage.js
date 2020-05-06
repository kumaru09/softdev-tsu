import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Container } from "@material-ui/core";

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
    fontSize: "2.5rem",
    color: "#000000",
    fontWeight: "bold",
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
  header: {
    fontSize: "1.0rem",
  },
}));

const VerifyPage = (props) => {
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
          <div className={classes.logo}>ยืนยันตัวตน</div>
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
                  <Grid item xs={12} md={12}>
                    <div className={classes.header}>เลขประจำตัวประชาชน:</div>
                    <TextField
                      id="identityNo"
                      label="เลขประจำตัวประชาชน"
                      margin="normal"
                      variant="outlined"
                      values={values.identityNo}
                      onChange={handleChange}
                      helperText={touched.identityNo ? errors.identityNo : ""}
                      error={touched.identityNo && Boolean(errors.identityNo)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className={classes.header}>
                      รูปถ่ายหน้าพร้อมบัตรประชาชน:
                    </div>
                    <TextField
                      id="identityPic"
                      placeholder="รูปถ่ายหน้าพร้อมบัตรประชาชน"
                      type="file"
                      accept="image/*"
                      margin="normal"
                      variant="outlined"
                      values={values.identityPic}
                      onChange={handleChange}
                      helperText={touched.identityPic ? errors.identityPic : ""}
                      error={touched.identityPic && Boolean(errors.identityPic)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className={classes.header}>ชื่อธนาคาร:</div>
                    <TextField
                      id="identityNo"
                      label="ชื่อธนาคาร"
                      margin="normal"
                      variant="outlined"
                      values={values.identityNo}
                      onChange={handleChange}
                      helperText={touched.identityNo ? errors.identityNo : ""}
                      error={touched.identityNo && Boolean(errors.identityNo)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className={classes.header}>เลขบัญชีธนาคาร:</div>
                    <TextField
                      id="identityNo"
                      label="เลขบัญชีธนาคาร"
                      margin="normal"
                      variant="outlined"
                      values={values.identityNo}
                      onChange={handleChange}
                      helperText={touched.identityNo ? errors.identityNo : ""}
                      error={touched.identityNo && Boolean(errors.identityNo)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      color="primary"
                    >
                      ยืนยัน
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
const checkNumberOnly = /^[0-9]+$/;
const verifyForm = withFormik({
  mapPropsToValues: ({ identityNo, identityPic }) => {
    return {
      identityNo: identityNo || "",
      identityPic: identityPic || "",
    };
  },
  validationSchema: yup.object().shape({
    identityNo: yup
      .string()
      .required("This field is required")
      .matches(checkNumberOnly, "Please enter only number")
      .length(13, "Please enter 13 digit"),
    identityPic: yup.string().required("This field is required"),
  }),

  handleSubmit: (values, { setFieldValue, setSubmitting }) => {
    setSubmitting(true);
    setFieldValue(values);
  },
})(VerifyPage);

export default verifyForm;
