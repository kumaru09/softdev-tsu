import React, { useEffect } from 'react'
import { Container, List, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFavorite } from '../slices/favorite'
import Favorite from '../component/Favorite'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

const FavoritePage = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorite.favorites)

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


    return (
        <Container maxWidth="md">
            <Typography>รายการทัวร์โปรด</Typography>
            <List>
                {favorites && favorites.map((favorite) => (<Favorite key={favorite.tour} name={favorite} deleteFavorite={deleteFavorite} />))}
            </List>
        </Container>
    )
}

export default FavoritePage