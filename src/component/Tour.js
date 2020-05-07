import React, { Fragment } from 'react'
import { Typography, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Tour = ({ tour }) => (
    <Fragment>
    <ListItem component={Link} to={`/tours/${tour.id}`} style={{color: '#000'}}>
        <ListItemText 
            primary={<Typography variant="h6">{tour.name}</Typography>}
            secondary={
                <Fragment>
            <Typography variant="body2">
            {tour.description.substring(0, 250)+"..."}
            </Typography>
            {tour.g_name}
            </Fragment>}
        />
    </ListItem>
    <Divider variant="fullWidth" />
    </Fragment>
)