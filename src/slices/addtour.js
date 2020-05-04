import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"
import { history } from "../helpers/history"

export const initialState = {}

const addtourSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {
        ADDTOUR_REQUEST: state => {
            state.adding = true
        },
        ADDTOUR_SUCCESS: state => {
            state.adding = false
        },
        ADDTOUR_FAILURE: state => {
            state.adding = false
        },
    }
})

export const {ADDTOUR_REQUEST, ADDTOUR_SUCCESS, ADDTOUR_FAILURE} = addtourSlice.actions
export default addtourSlice.reducer

export function addTour(input) {
    return async dispatch => {
        dispatch(ADDTOUR_REQUEST)
        
        Axios.post('http://api.sdp.19991999.xyz/tours/')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    }
}