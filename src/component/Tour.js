import React, { Fragment } from 'react'
import { Typography, ListItem, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Tour = ({ tour }) => (
    // <Grid item xs>
    // <CardActionArea component={Link} to={`/tours/${tour.id}`}>
    // <Card>
    //             <Typography variant="h6">{tour.name}</Typography>
    //             <Typography variant="subtitle1">{tour.description}</Typography>
    //             <Typography>{tour.g_name}</Typography>
    // </Card>
    // </CardActionArea>
    // </Grid>
    <Fragment>
    <ListItem component={Link} to={`/tours/${tour.id}`}>
        <ListItemText 
            primary={<Typography variant="h6">{tour.name}</Typography>}
            secondary={
                <Fragment>
            <Typography variant="body2">
            {tour.description}
            </Typography>
            {tour.g_name}
            </Fragment>}
        />
    </ListItem>
    <Divider variant="fullWidth" />
    </Fragment>
)