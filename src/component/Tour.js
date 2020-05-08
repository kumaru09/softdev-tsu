import React, { Fragment } from 'react'
import { Typography, ListItem, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Tour = ({ tour }) => (
  <Fragment>
    <ListItem component={Link} to={`/tours/${tour.id}`} style={{ color: '#000' }}>
      <ListItemText
        primary={<Typography component="span" variant="h6">{tour.name}</Typography>}
        secondary={
          <Fragment>
            <Typography component="span" variant="body1">
              {tour.description.substring(0, 250)}
            </Typography>
            {" - " + tour.g_name}
          </Fragment>}
      />
    </ListItem>
    <Divider variant="fullWidth" />
  </Fragment>
)