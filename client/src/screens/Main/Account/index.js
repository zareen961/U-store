import React, { useState } from 'react'
import { PencilIcon } from '@primer/octicons-react'

import AccountForm from '../../../components/Main/AccountForm'
import ScreenHeader from '../../../components/utils/ScreenHeader'
import './Account.css'

const Account = () => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className="account">
            <div className="account__card">
                <div className="account__headerWrapper">
                    <ScreenHeader
                        title={'Account'}
                        handleButtonPress={() => setIsEdit((prevIsEdit) => !prevIsEdit)}
                        buttonText={'Edit Profile'}
                    >
                        <PencilIcon size={16} />
                    </ScreenHeader>
                </div>
                <div className="account__formWrapper">
                    <AccountForm isEdit={isEdit} setIsEdit={setIsEdit} />
                </div>
            </div>
        </div>
    )
}

export default Account
