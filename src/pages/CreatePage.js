import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMember, memberSelector } from '../slices/member'
import TourForm from './TourForm';
import VerifyPage from './VerifyPage'

const CreatePage = () => {
    const dispatch = useDispatch()
    const { member, loading, hasErrors }= useSelector(memberSelector)
    useEffect(() => {
        let user = JSON.parse(atob(localStorage.getItem("user").split('.')[1]))

        dispatch(fetchMember(user.user_id))
    },[dispatch])

    const renderCreate = () => {
        if (loading) return ""
        if (member && !member.verify) return <VerifyPage />

        return member.verify && <TourForm />
    }

    return (
        <Fragment>
            {renderCreate()}
        </Fragment>
    )
}

export default CreatePage