import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navbar from './component/Navbar'
import { history } from './helpers/history'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import Register from './pages/Register'
import TourPage from './pages/TourPage'
import { PrivateRoute } from './component/PrivateRoute'
import TranscriptPage from './pages/TranscriptPage'
import ToursPage from './pages/ToursPage'
import TourForm from './pages/TourForm';
import MessagePage from './pages/MessagePage'

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
    },
    palette: {
      primary: {
        light: '#51d1e1',
        main: '#26c6da',
        dark: '#1a8a98',
        contrastText: '#000'
      },
      secondary: {
        light: '#ef6694',
        main: '#ec407a',
        dark: '#a52c55',
        contrastText: '#fff'
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/tours/:id" component={TourPage} />
        <Route exact path="/tours" component={ToursPage} />
        <Route exact path="/message" component={MessagePage} />
        <PrivateRoute exact path="/transcript" component={TranscriptPage} />
        <PrivateRoute exact path="/create" component={TourForm}  />
        <Redirect to="/" />
      </Switch>
    </Router>
    </ThemeProvider>
  )
}

export default App;
