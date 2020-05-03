import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"

export const initialState = {
    loading: false,
    hasError: false,
    message: []
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        MESSAGE_REQUEST: state => {
            state.loading = true
        },
        MESSAGE_SUCCESS: (state, { payload }) => {
            state.loading = false
            state.message = payload
            state.hasError = false
        },
        MESSAGE_FAILURE: state => {
            state.loading = false
            state.hasError = true
        }
    }
})

export const {MESSAGE_REQUEST, MESSAGE_SUCCESS, MESSAGE_FAILURE} = messageSlice.actions
export default messageSlice.reducer

export function fetchMessage() {
    return async dispatch => {
        dispatch(MESSAGE_REQUEST)

        Axios.get()
        .then(res => {
            console.log(res.data)
            dispatch(MESSAGE_SUCCESS(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(MESSAGE_FAILURE())
        })
    }
}