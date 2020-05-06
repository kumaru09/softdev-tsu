import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"
import { history } from "../helpers/history"
import { authHeader } from '../helpers/auth-header'

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
    let fromdata = new FormData()
    fromdata.append("pic",input.picture)

    let tour = {
        name: input.tourname,
        description: input.description,
        category: input.category,
        max_member: input.person,
        first_day: input.startDate,
        last_day: input.endDate,
        price: input.price,
        status: 1,
    }

    return async dispatch => {
        dispatch(ADDTOUR_REQUEST())
        
        Axios.post('https://api.19991999.xyz/tours/',tour,{ headers: authHeader(), data: fromdata})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    }
}