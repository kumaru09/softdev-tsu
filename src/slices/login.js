import { createSlice } from '@reduxjs/toolkit'
import { history } from '../helpers/history'
import Axios from 'axios'

let user = JSON.parse(localStorage.getItem('user'))

export const initialState = user ? {
    loggingin: false,
    isAuth: true,
    user
} : {}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        LOGIN_REQUEST: (state, { payload }) => {
            state.loggingin = true
            state.user = payload
        },
        LOGIN_SUCCESS: (state, { payload }) => {
            state.loggingin = false
            state.isAuth = true
            state.user = payload
        },
        LOGIN_FAILURE: state => {
            state.loggingin = false
        },
        LOGOUT: state => {
            state.isAuth = false
            state.user = ""
        }
    }
})

export const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = loginSlice.actions
export const usersSelector = state => state.login
export default loginSlice.reducer

export function login(username, password) {

    return async dispatch => {
        dispatch(LOGIN_REQUEST(username))

        Axios.post('http://api.sdp.19991999.xyz/login',{username: username, password: password})
        .then(res => {
            console.log(JSON.stringify(res.data))
            localStorage.setItem('user',JSON.stringify(res.data))
            dispatch(LOGIN_SUCCESS(res.data))
            history.push('/')
        })
        .catch(err => {
            console.log(err)
            dispatch(LOGIN_FAILURE())
        })
    }
}

export function logout () {
    return async dispatch => {
        localStorage.removeItem('user')
        dispatch(LOGOUT())
    }
}