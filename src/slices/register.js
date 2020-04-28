import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"
import { history } from "../helpers/history"

export const initialState = {}

const regisSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        REGISTER_REQUEST: state => {
            state.registering = true
        },
        REGISTER_SUCCESS: () => {},
        REGISTER_FAILURE: () => {}
    }
})

export const {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} = regisSlice.actions
export default regisSlice.reducer

export function register(members) {
    return async dispatch => {
        dispatch(REGISTER_REQUEST(members))

        Axios.post('http://api.sdp.19991999.xyz/members/',members)
        .then(res => {
            dispatch(REGISTER_SUCCESS())
            history.push('/')
        })
        .catch(err => {
            dispatch(REGISTER_FAILURE())
            console.log(err)
        })
    }
}