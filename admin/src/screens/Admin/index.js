import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { adminFetchAll } from '../../store/actions'
import Heading from '../../components/utils/Heading'
import AdminItem from '../../components/Admin/AdminItem'
import RegisterForm from '../../components/Admin/RegisterForm'
import Loader from '../../components/utils/Loader'

import './Admin.css'

const Admin = () => {
    const dispatch = useDispatch()
    const { loading, admins } = useSelector((state) => state.adminFetchAll)
    const { admin: adminStore } = useSelector((state) => state.adminLogin)

    useEffect(() => {
        dispatch(adminFetchAll())
    }, [dispatch])

    return (
        <main className="admin">
            <section className="admin__leftPanel">
                <Heading>All Admins</Heading>
                {loading ? (
                    <Loader size={'3.5rem'} thickness={10} />
                ) : (
                    admins.map((admin) => (
                        <AdminItem
                            admin={admin}
                            key={admin._id}
                            isAdmin={adminStore && adminStore.username === admin.username}
                        />
                    ))
                )}
            </section>
            <section className="admin__rightPanel">
                <Heading>Register New Admin</Heading>
                <RegisterForm />
            </section>
        </main>
    )
}

export default Admin
