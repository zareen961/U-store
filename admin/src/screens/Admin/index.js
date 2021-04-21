import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { adminFetchAll } from '../../store/actions'
import Heading from '../../components/Heading'
import AdminItem from '../../components/Admin/AdminItem'
import RegisterForm from '../../components/Admin/RegisterForm'

import './Admin.css'

const Admin = () => {
    const dispatch = useDispatch()
    const { loading, error, admins } = useSelector((state) => state.adminFetchAll)

    useEffect(() => {
        dispatch(adminFetchAll())
    }, [dispatch])

    return (
        <main className="admin">
            <section className="admin__leftPanel">
                <Heading>All Admins</Heading>
                <AdminItem username="VeNoM" createdAt="11.07.1999T10.53.54+5.30GMT" />
            </section>
            <section className="admin__rightPanel">
                <Heading>Register New Admin</Heading>
                <RegisterForm />
            </section>
        </main>
    )
}

export default Admin
