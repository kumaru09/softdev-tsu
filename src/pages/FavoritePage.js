import React, { useEffect } from 'react'
import { Container, List, Typography, Grid, CardHeader, makeStyles, CardContent, Card } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFavorite, favoriteSelector } from '../slices/favorite'
import Favorite from '../component/Favorite'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "2rem",
    },
    header: {
      backgroundColor: theme.palette.secondary.light,
      color: 'white'
    },
  }));

const FavoritePage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { favorites, loading, hasErrors } = useSelector(favoriteSelector)

    useEffect(() => {
        dispatch(fetchAllFavorite())
    },[dispatch])

    const deleteFavorite = (id) => {
        Axios.delete(`https://api.19991999.xyz/favorites/${id}`, { headers: authHeader() })
        .then(res => {
            dispatch(fetchAllFavorite())
        })
        .catch(err => {
            console.log(err)
        })
    }

    const renderFavorite = () => {
        if (loading) return <Typography>กำลังโหลดข้อมูล...</Typography>
        if (hasErrors) return <Typography>เกิดจ้อผิดพลาดบางอย่าง...</Typography>
        if (!favorites) return <Typography>ไม่มีรายการโปรด...</Typography>

        return favorites && favorites.map((favorite) => (<Favorite key={favorite.tour} name={favorite} deleteFavorite={deleteFavorite} />))
    }


    return (
        <Container maxWidth="md">
            <Grid container direction="column" className={classes.root}>
            <Card>
            <Grid item xs>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h5">รายการทัวร์โปรด</Typography>}
            />
            </Grid>
            <Grid item xs>
            <CardContent>
            <List>
                {renderFavorite()}
            </List>
            </CardContent>
            </Grid>
            </Card>
            </Grid>
           
        </Container>
    )
}

export default FavoritePage