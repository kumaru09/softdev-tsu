import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/login";
import { Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none'
  }
}));


const LoginPage = () => {
  const classes = useStyles()
  const initialFromState = { username: "", password: "" }
  const [input, setInput] = useState(initialFromState)
  const [submitted, setSubmitted] = useState(false)
  const loggingin = useSelector((state) => state.login.loggingin)

  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleSumbit = (event) => {
    event.preventDefault()

    setSubmitted(true)
    if (input.username && input.password)
      dispatch(login(input.username, input.password))
  }

  return (
    <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSumbit} className={classes.form}>
            <TextField 
              fullWidth
              required
              variant="outlined"
              margin="normal"
              id="username"
              label="username"
            />
            <Grid item xs>
            <TextField
              required
              fullWidth
              variant="outlined"
              type="password"
              margin="normal"
              id="password"
              label="password"
            />
            </Grid>
            <Button
              type="sumbit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" style={{textDecoration : 'none'}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" style={{textDecoration : 'none'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
