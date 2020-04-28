import React, { useEffect } from 'react'
import { Container, Typography, Grid, makeStyles, Paper, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { tourSelector, fetchTour } from '../slices/tour'

const useStyles = makeStyles((theme) => ({
    img: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'url(https://placekitten.com/600/750)',
    },
}))

const TourPage = ({ match }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { tour, loading: tourLoading, hasErrors: tourHasErrors } = useSelector(tourSelector)

    useEffect(() => {
        const { id } = match.params

        dispatch(fetchTour(id))
    }, [dispatch, match])

    return (
        <Container>
            <div style={{marginTop: "1.5rem"}}>
                <Typography variant="h3" gutterBottom>Kitten</Typography>
            </div>
            <div>
                <Paper>
                <Grid container spacing={1}>
                    <Grid className={classes.img} item xs={12} md={8} />
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="subtitle1">{"เวลาเดินทาง:"}</Typography>
                                <Typography variant="subtitle1">{"ตั้งแต่"}</Typography>
                                <Typography variant="subtitle1" gutterBottom>{"ถึง"}</Typography>
                            </Grid>
                            <Grid item style={{marginBottom: "1rem"}}>
                                <Typography variant="subtitle1">{"สถานที่:"}</Typography>
                                <Typography variant="subtitle1" gutterBottom>{"คาเฟ่แมว เมี๊ยวๆเลิฟเวอร์ สยาม คาเฟ่แมว เมี๊ยวๆเลิฟเวอร์ สยามคาเฟ่แมว เมี๊ยวๆเลิฟเวอร์ สยามคาเฟ่แมว เมี๊ยวๆเลิฟเวอร์ สยาม"}</Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "auto", marginRight: "1rem", marginBottom: "0.25rem"}}>
                                <Button>FREE</Button>
                                <Button color="primary" variant="contained">เข้าร่วม</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Paper>
            </div>
            <section>
                <Typography variant="h3" gutterBottom>Description</Typography>
                <Grid container>
                    
                </Grid>
            </section>
            <section>
                <Typography></Typography>
            </section>
        </Container>
    )
}

export default TourPage