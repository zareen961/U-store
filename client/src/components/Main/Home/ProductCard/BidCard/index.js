import React from 'react'
import { ThumbsupIcon, ThumbsdownIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import ButtonComp from '../../../../utils/ButtonComp'
import './BidCard.css'

const BidCard = ({ bid }) => {
    return (
        <div className="bidCard">
            <Avatar src="avatars/avatar24.png" className="bidCard__avatar" />
            <div className="bidCard__nameTime">
                <p>{bid.bidOwner}</p>
                <span>{moment(bid.createdAt).fromNow()}</span>
            </div>
            <div className="bidCard__price">
                <h3>
                    <NumberFormat
                        value={bid.price}
                        prefix={'Rs '}
                        thousandSeparator={true}
                        displayType={'text'}
                    />
                </h3>
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
