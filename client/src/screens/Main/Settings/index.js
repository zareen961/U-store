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
import { themeSwitch } from '../../../store/actions/ui'
import { getViewportWidth } from '../../../utils/getViewport'
import './Settings.scss'

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
                            text={getViewportWidth() > 1000 && 'Serene Sky'}
                            modifyClass={
                                getViewportWidth() > 1000
                                    ? 'themePurple'
                                    : 'themePurple iconButton'
                            }
                            handleOnClick={() => dispatch(themeSwitch('PURPLE'))}
                        >
                            <SunIcon size={18} />
                        </ButtonComp>
                        <ButtonComp
                            typeClass={'primary'}
                            text={getViewportWidth() > 1000 && 'Erotic Eve'}
                            modifyClass={
                                getViewportWidth() > 1000
                                    ? 'themeRed'
                                    : 'themeRed iconButton'
                            }
                            handleOnClick={() => dispatch(themeSwitch('RED'))}
                        >
                            <HeartFillIcon size={18} />
                        </ButtonComp>
                        <ButtonComp
                            typeClass={'primary'}
                            text={getViewportWidth() > 1000 && 'Numb Night'}
                            modifyClass={
                                getViewportWidth() > 1000
                                    ? 'themeBlue'
                                    : 'themeBlue iconButton'
                            }
                            handleOnClick={() => dispatch(themeSwitch('BLUE'))}
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
