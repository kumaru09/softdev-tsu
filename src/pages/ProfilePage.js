import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Avatar, Box } from '@material-ui/core'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMember } from '../slices/member'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 5rem',
    padding: '0 7rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0'
    },
    marginTop: 'auto',
    width: '100%'
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
      margin: '-0.5rem 0'
    }
  },

  avatarLayout: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },

  header: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    padding: '0.5rem',
    color: '#000000',
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
    marginTop: '1rem',
    marginLeft: '2rem'
  },

  iconLayout: {
    marginTop: '0.9rem',
    marginLeft: '2rem',
    justifyContent: 'left',
    alignItems: 'left',
    width: theme.spacing(5),
    height: theme.spacing(5)
  },

  content: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    padding: '0.5rem',
    color: '#000000',
    fontWeight: 'regular',
    letterSpacing: '0.1rem',
    marginTop: '0.1rem',
    marginLeft: '4rem'
  },

  twoBoxLayout: {
    width: '100%',
    marginLeft: '4.5rem',
    border: '0.1rem solid #000000',
    borderRadius: '0.5px',
    padding: '2%',
    textAlign: 'left'
  },

  boxLayout: {
    width: '94%',
    marginLeft: '4.5rem',
    border: '0.1rem solid #000000',
    borderRadius: '0.5px',
    padding: '2%',
    textAlign: 'left'
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const member = useSelector(state => state.member.member)

  useEffect(() => {
    let user = JSON.parse(atob(localStorage.getItem('user').split('.')[1]))
    console.log(user.user_id)
    dispatch(fetchMember(user.user_id))
  }, [dispatch])

  return (
    <Container maxwidth="md">
      <Grid container direction="row" justify="center" alignContent="center" className={classes.topLayout}>
        <Grid item md={11} xs={11}>
          <div className={classes.logo}>
            <div className={classes.border}>USER PROFILE</div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid container item md={12} spacing={5} justify="center" alignItems="center">
          <Avatar className={classes.avatarLayout} src="https://image.flaticon.com/icons/svg/147/147144.svg" />
        </Grid>
      </Grid>

      <Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={10}>
        <Grid container item md={6} spacing={3}>
          <Grid item md={1}>
            <PersonRoundedIcon className={classes.iconLayout} />
          </Grid>

          <Grid item md={11}>
            <div className={classes.header}>PERSONAL INFORMATION</div>
          </Grid>

          <Grid container md={12} spacing={1}>
            <Grid item md={12}>
              <div className={classes.content}>Firstname - Lastname</div>
              <Grid container spacing={3} direction="row">
                <Grid item xs={6} md={6}>
                  <Box display="block" displayPrint="none" className={classes.twoBoxLayout}>{member.name}</Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box display="block" displayPrint="none" className={classes.twoBoxLayout}>{member.surname}</Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className={classes.content}>Phone number</div>
              <Grid item md={12}>
                <Box display="block" displayPrint="none" width="90%" className={classes.boxLayout}>(phone number)</Box>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className={classes.content}>Address</div>
              <Grid item md={12}>
                <Box display="block" displayPrint="none" className={classes.boxLayout}>{member.address}</Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item md={6} spacing={3}>
          <Grid item md={1}>
            <EmailRoundedIcon className={classes.iconLayout} />
          </Grid>

          <Grid item md={11}>
            <div className={classes.header}>ACCOUNT INFORMATION</div>
          </Grid>

          <Grid container md={12} spacing={3}>
            <Grid item md={12}>
              <div className={classes.content}>Username</div>
              <Grid item md={6}>
                <Box display="block" displayPrint="none" className={classes.boxLayout}>(username)</Box>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className={classes.content}>Email</div>
              <Grid item md={6}>
                <Box display="block" displayPrint="none" className={classes.boxLayout}>{member.email}</Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage