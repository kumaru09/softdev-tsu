import { createSlice } from '@reduxjs/toolkit'
import { getTourSuccess } from './tour'
import Axios from 'axios'

export const initialState = {
  loading: false,
  hasErrors: false,
  tours: [],
}

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    getTours: state => {
      state.loading = true
    },
    getToursSuccess: (state, { payload }) => {
      state.tours = payload
      state.loading = false
      state.hasErrors = false
    },
    getToursFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getTours, getToursSuccess, getToursFailure } = toursSlice.actions
export const postsSelector = state => state.posts
export default toursSlice.reducer

export function fetchTours() {
  return async dispatch => {
    dispatch(getTours())

    Axios.get('http://api.sdp.19991999.xyz/tours/')
    .then(res => {
        dispatch(getTourSuccess(res))
    })
    .catch(err => {
        console.log(err)
        dispatch(getToursFailure())
    })
  }
}
