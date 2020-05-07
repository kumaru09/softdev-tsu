import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'
import {authHeader} from '../helpers/auth-header';

export const initialState = {
  loading: false,
  hasErrors: false,
  favorite: false,
  favorites: []
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    getFavorite: state => {
      state.loading = true
      state.favorite = false
    },
    getFavoriteSuccess: (state, {payload}) => {
      state.favorite = true
      state.loading = false
      state.favorites = payload
    },
    getFavoriteFailure: state => {
      state.loading = false
    },
  },
})

export const { getFavorite, getFavoriteSuccess, getFavoriteFailure } = favoriteSlice.actions
export const favoriteSelector = state => state.favorite
export default favoriteSlice.reducer

export function fetchFavorite(id) {
  return async dispatch => {
    dispatch(getFavorite())
    console.log(id)

    Axios.get(`https://api.19991999.xyz/favorites/${id}`, { headers: authHeader() })
    .then(res => {
      dispatch(getFavoriteSuccess())
    })
    .catch(err => {
      console.log(err)
      dispatch(getFavoriteFailure())
    })
  }
}

export function fetchAllFavorite() {
    return async dispatch => {
      dispatch(getFavorite())
  
      Axios.get('https://api.19991999.xyz/favorites/', { headers: authHeader() })
      .then(res => {
        console.log(res.data)
        dispatch(getFavoriteSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(getFavoriteFailure())
      })
    }
  }
