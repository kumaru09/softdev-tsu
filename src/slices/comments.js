import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

export const initialState = {
  loading: false,
  hasErrors: false,
  comments: [],
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: state => {
      state.loading = true
    },
    getCommentsSuccess: (state, { payload }) => {
      state.comments = payload
      state.loading = false
      state.hasErrors = false
    },
    getCommentsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const {
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
} = commentsSlice.actions
export const commentsSelector = state => state.comments
export default commentsSlice.reducer

export function fetchComments(id) {
  return async dispatch => {
    dispatch(getComments())

    Axios.get(`https://api.19991999.xyz/tours/${id}/reviews`, { headers: authHeader() })
      .then((res) => {
        console.log(res)
        dispatch(getCommentsSuccess(res.data))
      })
      .catch((err) => {
        console.log(err)
        dispatch(getCommentsFailure())
      })
  }
}
