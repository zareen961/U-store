import React from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import ChipComp from '../../../utils/ChipComp'
import './ContactBidCard.css'

const ContactBidCard = ({ bid, highestBid }) => {
    return (
        <div className="contactBidCard">
            <div className="contactBidCard__bidOwnerDetailsWrapper"></div>
            <div className="contactBidCard__bidPriceDetailsWrapper">
                <div className="bidPriceDetailsHeader">
                    <span className="timestamp">{moment(bid.createdAt).fromNow()}</span>
                    <div className="highestBidComparisonBar"></div>
                </div>
                <h3 className="contactBidCard__price">
                    <NumberFormat
                        value={bid.price}
                        prefix={'Rs '}
                        thousandSeparator={true}
                        displayType={'text'}
                    />
                </h3>
                <ChipComp
                    text={bid.status}
                    type={
                        bid.status === 'REJECTED'
                            ? 'error'
                            : bid.status === 'ACCEPTED'
                            ? 'success'
                            : 'neutral'
                    }
                />
            </div>
        </div>
    )
}

export default ContactBidCard
