import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'

export const initialState = {
  loading: false,
  hasErrors: false,
  member: [],
}

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    getMember: state => {
      state.loading = true
    },
    getMemberSuccess: (state, { payload }) => {
      state.member = payload
      state.loading = false
      state.hasErrors = false
    },
    getMemberFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getMember, getMemberSuccess, getMemberFailure } = memberSlice.actions
export const memberSelector = state => state.member
export default memberSlice.reducer

export function fetchMember(id) {
  return async dispatch => {
    dispatch(getMember())

    Axios.get(`https://api.19991999.xyz/members/${id}`, { headers: authHeader() })
    .then(res => {
      dispatch(getMemberSuccess(res.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(getMemberFailure())
    })
  }
}
