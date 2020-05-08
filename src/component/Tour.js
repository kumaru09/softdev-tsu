import React, { Fragment } from 'react'
import { Typography, ListItem, ListItemText, Divider, Grid, CardMedia, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  media: {
    padding: "80px",
  }
}));

export const Tour = ({ tour }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <ListItem component={Link} to={`/tours/${tour.id}`} style={{ color: '#000' }}>
        <ListItemText
          primary={<Typography component="span" variant="h6">{tour.name}</Typography>}
          secondary={
            <Fragment>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    className={classes.media}
                    image={`https://api.19991999.xyz/pic/${tour.pic}`}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="span" variant="body1">
                    {tour.description.substring(0, 250)}
                  </Typography>
                  {" - " + tour.g_name}
                </Grid>
              </Grid>
            </Fragment>}
        />
      </ListItem>
      <Divider variant="fullWidth" />
    </Fragment>
  )
}