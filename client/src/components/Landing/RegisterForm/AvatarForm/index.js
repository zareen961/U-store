import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseSharpIcon from '@material-ui/icons/CloseSharp'

import ModalComp from '../../../utils/ModalComp'
import './AvatarForm.scss'

const shuffle = (array) => {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

const AvatarForm = ({ isAvatarOpen, setIsAvatarOpen, setAvatar }) => {
    const [shuffledArray, setShuffledArray] = useState([...Array(30).keys()])

    useEffect(() => {
        setShuffledArray((prevArray) => shuffle(prevArray))
    }, [])

    return (
        <ModalComp
            isOpen={isAvatarOpen}
            handleOnClose={() => setIsAvatarOpen(false)}
            maxWidth={'lg'}
        >
            <div className="avatarForm">
                <div className="avatarForm__header">
                    <h1>Choose Your Favorite!</h1>
                    <IconButton
                        className="avatarForm__closeButton"
                        onClick={() => setIsAvatarOpen(false)}
                    >
                        <CloseSharpIcon />
                    </IconButton>
                </div>
                <div className="avatarForm__avatarsWrapper">
                    {shuffledArray.map((avatarNumber) => (
                        <div className="avatarForm__inputGroup" key={avatarNumber}>
                            <input
                                type="radio"
                                name="avatar"
                                id={`avatar${avatarNumber + 1}`}
                                value={avatarNumber + 1}
                                onChange={setAvatar}
                            />
                            <label htmlFor={`avatar${avatarNumber + 1}`}>
                                <img
                                    src={`avatars/avatar${avatarNumber + 1}.png`}
                                    alt={`avatar-${avatarNumber + 1}`}
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    className="avatarForm__doneButton"
                    onClick={() => setIsAvatarOpen(false)}
                >
                    Done
                </button>
            </div>
        </ModalComp>
    )
}

export default AvatarForm
