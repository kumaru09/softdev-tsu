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

export function addTour(input, id) {
    let fromdata = new FormData()
    fromdata.append("pic",input.picture)

    return async dispatch => {
        dispatch(ADDTOUR_REQUEST())

        Axios.post('https://api.19991999.xyz/upload',fromdata,{headers: authHeader()})
        .then(res => 
            {console.log(res)
                let tour = {
                    name: input.tourname,
                    description: input.description,
                    category: input.category,
                    max_member: input.person,
                    first_day: input.startDate,
                    last_day: input.endDate,
                    price: input.price,
                    status: 1,
                    list: id,
                    pic: res.data.file
                }
            console.log(tour)
            Axios.post('https://api.19991999.xyz/tours/',tour,{ headers: authHeader()})
            .then(res => {
                console.log(res)
                Axios.post(`https://api.19991999.xyz/tours/${res.data.id}/lists`, {list : id} ,{headers: authHeader()} )
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
                history.push(`/tours/${res.data.id}`)
            })
            .catch(err => {
                console.log(err)
            })}
        )
        .catch(err => {
            console.log(err)
        })

    }
}