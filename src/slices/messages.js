import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"
import { authHeader } from '../helpers/auth-header'

export const initialState = {
    loading: false,
    hasError: false,
    messages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        MESSAGES_REQUEST: state => {
            state.loading = true
        },
        MESSAGES_SUCCESS: (state, { payload }) => {
            state.loading = false
            state.messages = payload
            state.hasError = false
        },
        MESSAGES_FAILURE: state => {
            state.loading = false
            state.hasError = true
        }
    }
})

export const {MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_FAILURE} = messagesSlice.actions
export default messagesSlice.reducer

export function fetchMessages() {
    return async dispatch => {
        dispatch(MESSAGES_REQUEST())

        Axios.get('http://api.sdp.19991999.xyz/messages', { headers: authHeader() })
        .then(res => {
            console.log(res.data)
            dispatch(MESSAGES_SUCCESS(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(MESSAGES_FAILURE())
        })
    }
}