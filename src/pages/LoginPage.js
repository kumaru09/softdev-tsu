import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/login";
import { Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, makeStyles, Box } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { spacing } from '@material-ui/system';

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
}));


const LoginPage = () => {
  const classes = useStyles()
  const initialFromState = { username: "", password: "" }
  const [input, setInput] = useState(initialFromState)
  const [submitted, setSubmitted] = useState(false)
  const loggingin = useSelector((state) => state.login.loggingin)
  const hasErrors = useSelector(state => state.login.hasErrors)

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
    {hasErrors && <Alert severity="error">This is an error alert — check it out!</Alert>}
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
              name="username"
              onChange={handleInputChange}
              defaultValue={input.username}
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
              name="password"
              onChange={handleInputChange}
              defaultValue={input.password}
            />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              { submitted && loggingin && <CircularProgress color="secondary" size='1.5rem' />}Login
            </Button>
            <Grid container>
            <Grid item md={5} xs={12}>
              <Link to="/" variant="body2" style={{textDecoration : 'none'}}>
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
