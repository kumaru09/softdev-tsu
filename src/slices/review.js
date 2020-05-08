import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

export const initialState = {
  loading: false,
  hasErrors: false,
  review: [],
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getreview: state => {
      state.loading = true
    },
    getreviewSuccess: (state, { payload }) => {
      state.review = payload
      state.loading = false
      state.hasErrors = false
    },
    getreviewFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const {
  getreview,
  getreviewSuccess,
  getreviewFailure,
} = reviewSlice.actions
export const reviewSelector = state => state.review
export default reviewSlice.reducer

export function fetchReview(id) {
  return async dispatch => {
    dispatch(getreview())

    Axios.get(`https://api.19991999.xyz/reviews/${id}`, { headers: authHeader() })
      .then((res) => {
        console.log(res)
        dispatch(getreviewSuccess(res.data))
      })
      .catch((err) => {
        console.log(err)
        dispatch(getreviewFailure())
      })
  }
}
