import React, { useState } from 'react'
import { PencilIcon, XCircleIcon } from '@primer/octicons-react'

import AccountForm from '../../../components/Main/AccountForm'
import BlockHeader from '../../../components/utils/BlockHeader'
import ButtonComp from '../../../components/utils/ButtonComp'
import './Account.scss'

const Account = () => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className="account">
            <div className="account__card">
                <div className="account__headerWrapper">
                    <BlockHeader title={'Account'}>
                        <ButtonComp
                            typeClass={'secondary'}
                            text={isEdit ? 'Cancel' : 'Edit Profile'}
                            handleOnClick={() => setIsEdit((prevIsEdit) => !prevIsEdit)}
                        >
                            {isEdit ? (
                                <XCircleIcon size={16} />
                            ) : (
                                <PencilIcon size={16} />
                            )}
                        </ButtonComp>
                    </BlockHeader>
                </div>

                <div className="account__formWrapper">
                    <AccountForm isEdit={isEdit} setIsEdit={setIsEdit} />
                </div>
            </div>
        </div>
    )
}

export default Account
