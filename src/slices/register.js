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
        REGISTER_SUCCESS: state => {
            state.registering = false
        },
        REGISTER_FAILURE: state=> {
            state.registering = false
        }
    }
})

export const {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} = regisSlice.actions
export default regisSlice.reducer

export function register(members) {
    const input = {
        name: members.firstName,
        surname: members.lastName,
        username: members.username,
        password: members.password,
        email: members.email,
        address: members.address,
    }
    
    return async dispatch => {
        dispatch(REGISTER_REQUEST())

        Axios.post('https://api.19991999.xyz/members/',input)
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