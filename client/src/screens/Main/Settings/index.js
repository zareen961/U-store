import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    SunIcon,
    HeartFillIcon,
    MoonIcon,
    AlertIcon,
    ReplyIcon,
} from '@primer/octicons-react'
import { useHistory } from 'react-router-dom'

import BlockHeader from '../../../components/utils/BlockHeader'
import ButtonComp from '../../../components/utils/ButtonComp'
import SettingsItem from '../../../components/Main/Settings/SettingsItem'
import DangerConfirmModal from '../../../components/utils/DangerConfirmModal'
import * as actionTypes from '../../../store/actionTypes'
import './Settings.css'

const Settings = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isDangerOpen, setIsDangerOpen] = useState(false)

    return (
        <>
            <div className="settings">
                <div className="settings__headerWrapper">
                    <BlockHeader title={'Settings'}>
                        <ButtonComp
                            typeClass={'secondary'}
                            text={'Go Back'}
                            handleOnClick={history.goBack}
                        >
                            <ReplyIcon size={18} />
                        </ButtonComp>
                    </BlockHeader>
                </div>

                <div className="settings__bodyWrapper">
                    <SettingsItem title={'Switch Theme'}>
                        <ButtonComp
                            typeClass={'primary'}
                            text={'Serene Sky'}
                            modifyClass={'themePurple'}
                            handleOnClick={() =>
                                dispatch({
                                    type: actionTypes.THEME_SET_PURPLE,
                                })
                            }
                        >
                            <SunIcon size={18} />
                        </ButtonComp>
                        <ButtonComp
                            typeClass={'primary'}
                            text={'Erotic Eve'}
                            modifyClass={'themeRed'}
                            handleOnClick={() =>
                                dispatch({
                                    type: actionTypes.THEME_SET_RED,
                                })
                            }
                        >
                            <HeartFillIcon size={18} />
                        </ButtonComp>
                        <ButtonComp
                            typeClass={'primary'}
                            text={'Numb Night'}
                            modifyClass={'themeBlue'}
                            handleOnClick={() =>
                                dispatch({
                                    type: actionTypes.THEME_SET_BLUE,
                                })
                            }
                        >
                            <MoonIcon size={18} />
                        </ButtonComp>
                    </SettingsItem>

                    <SettingsItem title={'Delete Account'}>
                        <ButtonComp
                            typeClass={'secondary'}
                            text={'Delete Account'}
                            modifyClass={'deleteAccount'}
                            handleOnClick={() => setIsDangerOpen(true)}
                        >
                            <AlertIcon size={18} />
                        </ButtonComp>
                    </SettingsItem>
                </div>
            </div>

            <DangerConfirmModal
                isDangerOpen={isDangerOpen}
                setIsDangerOpen={setIsDangerOpen}
                title={"You're going to delete your account"}
                textToEnter={'YES I WANT TO DELETE MY ACCOUNT'}
            />
        </>
    )
}

export default Settings
