import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navbar from './component/Navbar'
import { history } from './helpers/history'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import Register from './pages/Register'
import TripPage from './pages/TripPage'

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Prompt',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/trip" component={TripPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
    </ThemeProvider>
  )
}

export default App;
