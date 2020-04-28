import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'

export const initialState = {
  loading: false,
  hasErrors: false,
  tour: {},
}

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    getTour: state => {
      state.loading = true
    },
    getTourSuccess: (state, { payload }) => {
      state.tour = payload
      state.loading = false
      state.hasErrors = false
    },
    getTourFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getTour, getTourSuccess, getTourFailure } = tourSlice.actions
export const tourSelector = state => state.tour
export default tourSlice.reducer

export function fetchTour(id) {
  return async dispatch => {
    dispatch(getTour())

    Axios.get(`http://api.sdp.19991999.xyz/tours/${id}`)
    .then(res => {
      dispatch(getTourSuccess(res))
    })
    .catch(err => {
      console.log(err)
      dispatch(getTourFailure())
    })
  }
}
