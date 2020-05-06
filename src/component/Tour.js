import React from 'react'
import { Paper, Grid, Typography, CardActionArea } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Tour = ({ tour }) => (
    <Grid item xs>
    <CardActionArea component={Link} to={`/tours/${tour.id}`}>
    <Paper>
        <Grid container wrap="nowrap" direction="column">
            <Grid item xs>
                <Typography variant="h6">{tour.name}</Typography>
            </Grid>
            <Grid item xs>
                <Typography variant="subtitle1">{tour.description}</Typography>
            </Grid>
            <Grid item xs>
                <Typography>{tour.g_name}</Typography>
            </Grid>
        </Grid>
    </Paper>
    </CardActionArea>
    </Grid>
)