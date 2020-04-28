import { createSlice } from '@reduxjs/toolkit'
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
export const toursSelector = state => state.tours
export default toursSlice.reducer

export function fetchTours() {
  return async dispatch => {
    dispatch(getTours())

    Axios.get('http://api.sdp.19991999.xyz/tours/',{search: ""})
    .then(res => {
        dispatch(getToursSuccess(res.data))
    })
    .catch(err => {
        console.log(err)
        dispatch(getToursFailure())
    })
  }
}
