import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container, Button, Grid, TextField, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { register } from "../slices/register";

const useStyles = makeStyles((theme) => ({
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
  topLayout: {
    margin: "4rem 0",
    [theme.breakpoints.down("xs")]: {
      margin: "1rem 0",
    },
  },
  paperLayout: {
    padding: "2rem",
    [theme.breakpoints.up("md")]: {
      width: "35em",
    },
    marginTop: "-1rem",
    margin: "auto",
    border: "1px solid #ebedf0",
    borderRadius: "4px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "3rem",
    },
  },
  textField: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  errorMessage: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.2rem",
  },
}));

const checkCharacterOnly = /^[A-Za-z]+$/;
const checkNumberOnly = /^[0-9]+$/;

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("This field is required.")
    .matches(checkCharacterOnly, "Please enter only characters.")
    .min(3, "Please enter at least 3 characters."),

  lastName: yup
    .string()
    .required("This field is required.")
    .matches(checkCharacterOnly, "Please enter only characters.")
    .min(3, "Please enter at least 3 characters."),

  phoneNumber: yup
    .string()
    .required("This field is required.")
    .matches(checkNumberOnly, "Please enter only number.")
    .min(10, "Please enter number 10 digits.")
    .max(10, "Please enter number 10 digits."),

  address: yup.string().required("This field is required."),

  username: yup.string().required("This field is required"),

  email: yup
    .string()
    .email("Invalid email.")
    .required("This field is required."),

  password: yup
    .string()
    .required("This field is required.")
    .min(3, "Please Enter less then 3 letters"),

  confirmPassword: yup
    .string()
    .required("This field is required.")
    .min(3, "This field at least 3 characters.")
    .oneOf([yup.ref("password"), null], "Password not match."),
});

const Register = () => {
  const classes = useStyles();
  const registerForm = useForm({
    validationSchema: registerSchema,
  });

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data)
    dispatch(register(data))
  }

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
          <Paper className={classes.paperLayout}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <div className={classes.logo}>
                  <div className={classes.border}>CREATE NEW ACCOUNT</div>
                </div>
              </Grid>
              <Grid item md={12} xs={12}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="username"
                        label="Username"
                        name="username"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.email}
                      />
                      {registerForm.errors.email && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.email.message}
                        </p>
                      )}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="password"
                        label="Password"
                        name="password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.password}
                      />
                      {registerForm.errors.password && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.password.message}
                        </p>
                      )}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="confirm-password"
                        label="Confirm Password"
                        name="confirmPassword"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.confirmPassword}
                      />
                      {registerForm.errors.confirmPassword && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.confirmPassword.message}
                        </p>
                      )}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="firstName"
                        label="Firstname"
                        name="firstName"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.firstName}
                        defaultValue={registerForm.firstName}
                        onChange={registerForm.handleInputChange}
                      />
                      {registerForm.errors.firstName && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.firstName.message}
                        </p>
                      )}
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        id="lastName"
                        label="Lastname"
                        name="lastName"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.lastName}
                      />
                      {registerForm.errors.lastName && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.lastName.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={0}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="email"
                        label="Email"
                        name="email"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.email}
                      />
                      {registerForm.errors.email && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.email.message}
                        </p>
                      )}
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        id="phoneNumber"
                        label="Phone number"
                        name="phoneNumber"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.phoneNumber}
                      />
                      {registerForm.errors.phoneNumber && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.phoneNumber.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={0}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="address"
                        label="Address"
                        name="address"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        inputRef={registerForm.register}
                        error={!!registerForm.errors.address}
                      />
                      {registerForm.errors.address && (
                        <p className={classes.errorMessage}>
                          {registerForm.errors.address.message}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Finish
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
