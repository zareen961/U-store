import React from 'react'
import { ThumbsupIcon, ThumbsdownIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../../../utils/ButtonComp'
import './BidCard.css'

const BidCard = ({ bid }) => {
    const history = useHistory()

    return (
        <div className="bidCard">
            <Avatar
                src={`avatars/avatar${bid.bidOwner.avatar}.png`}
                className="bidCard__avatar"
                onClick={() => history.push(`/contact/${bid.bidOwner._id}`)}
            />
            <div className="bidCard__nameTime">
                <p
                    className="username"
                    onClick={() => history.push(`/contact/${bid.bidOwner._id}`)}
                >
                    {bid.bidOwner.username}
                </p>
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
