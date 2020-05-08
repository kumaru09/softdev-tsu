import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"
import { authHeader } from '../helpers/auth-header'
import { history } from "../helpers/history"

export const initialState = {}

const addtranscriptSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    UPTRANSCRIPT_REQUEST: state => {
      state.adding = true
    },
    UPTRANSCRIPT_SUCCESS: state => {
      state.adding = false
    },
    UPTRANSCRIPT_FAILURE: state => {
      state.adding = false
    },
  }
})

export const { UPTRANSCRIPT_REQUEST, UPTRANSCRIPT_SUCCESS, UPTRANSCRIPT_FAILURE } = addtranscriptSlice.actions
export default addtranscriptSlice.reducer

export function upTranscript(input, id) {
  let fromdata = new FormData()
  fromdata.append("pic", input.transcript)

  return async dispatch => {
    dispatch(UPTRANSCRIPT_REQUEST())

    Axios.post(`https://api.19991999.xyz/upload`, fromdata, { headers: authHeader() })
      .then((res) => {
        console.log(res)

        Axios.put(`https://api.19991999.xyz/transcripts/${id}`, { file: res.data.file, time: input.transferDateTime }, { headers: authHeader() })
          .then((res) => {
            console.log(res)
            dispatch(UPTRANSCRIPT_SUCCESS())
          })
          .then(() => {
            history.push('/transcript')
          })

      })
      .catch(err => {
        console.log(err)
        dispatch(UPTRANSCRIPT_FAILURE())
      })

  }
}