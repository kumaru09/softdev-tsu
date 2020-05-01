import React from 'react'
import { makeStyles, Paper, Grid, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    }
}))

const classes = useStyles()

export const Review = ({ review }) => (
    <Paper className={classes.paper}>
        <Grid container>
            <Grid item>
                <Avatar>S</Avatar>
            </Grid>
            <Grid item xs>
                <Grid container direction="column">
                    <Grid item>
                    {review.comment}
                    </Grid>
                    <Grid item>
                    {review.ratting}
                    </Grid>
                    <Grid item>
                    {review.time}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
)