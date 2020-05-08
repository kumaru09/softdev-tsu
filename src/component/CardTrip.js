import React from 'react'
import { makeStyles, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton, Button, Box, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '18rem',
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  }
}))

export default function CardTrip() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="trip" className={classes.avatar}>
              S
                </Avatar>
          }
          title="Kumamama12"
          subheader="April 20, 2020"
        />
        <CardMedia
          className={classes.media}
          image="https://placekitten.com/600/750"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            A kitten is really very cute so much, I'd like to hug them
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Box ml="auto">
            <Button size="small" color="primary">Read More</Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}
