import React from 'react'
import { ThumbsupIcon, ThumbsdownIcon, PencilIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'

import ButtonComp from '../../../../utils/ButtonComp'
import './BidCard.css'

const BidCard = () => {
    return (
        <div className="bidCard">
            <Avatar src="avatars/avatar24.png" className="bidCard__avatar" />
            <div className="bidCard__nameTime">
                <p>@blck_tie</p>
                <span>2 hours ago</span>
            </div>
            <div className="bidCard__price">
                <h3>Rs 599</h3>
            </div>
            <div className="icon">
                <ButtonComp
                    typeClass={'primary'}
                    handleOnClick={() => {}}
                    modifyClass={'iconButton'}
                >
                    <ThumbsupIcon size={18} />
                </ButtonComp>
                <ButtonComp
                    typeClass={'secondary'}
                    handleOnClick={() => {}}
                    modifyClass={'iconButton'}
                >
                    <ThumbsdownIcon size={18} />
                </ButtonComp>
            </div>
        </div>
    )
}

export default BidCard
