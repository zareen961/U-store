import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Heading from '../../components/utils/Heading'
import { collegeFetchData } from '../../store/actions'
import CollegeForm from '../../components/CollegeForm'
import { collegeAdd, collegeDelete } from '../../store/actions'

import './College.css'

const College = () => {
    const dispatch = useDispatch()
    const { loading: loadingCollegeData, data } = useSelector(
        (state) => state.collegeFetchAll
    )
    const { loading: loadingCollegeAdd, success: successCollegeAdd } = useSelector(
        (state) => state.collegeAdd
    )
    const { loading: loadingCollegeRemove, success: successCollegeRemove } = useSelector(
        (state) => state.collegeDelete
    )

    const handleCollegeAdd = (collegeData, password) => {
        dispatch(collegeAdd(collegeData, password))
    }

    const handleCollegeRemove = (collegeData, password) => {
        dispatch(collegeDelete(collegeData, password))
    }

    useEffect(() => {
        dispatch(collegeFetchData())
    }, [dispatch])

    return (
        <main className="college">
            <section className="college__leftPanel">
                <Heading>Add College Data</Heading>
                <CollegeForm
                    isAdd
                    handleDispatch={handleCollegeAdd}
                    loading={loadingCollegeAdd}
                    success={successCollegeAdd}
                    collegeData={data}
                    loadingCollegeData={loadingCollegeData}
                />
            </section>
            <section className="college__rightPanel">
                <Heading>Remove College Data</Heading>
                <CollegeForm
                    handleDispatch={handleCollegeRemove}
                    loading={loadingCollegeRemove}
                    success={successCollegeRemove}
                    collegeData={data}
                    loadingCollegeData={loadingCollegeData}
                />
            </section>
        </main>
    )
}

export default College
