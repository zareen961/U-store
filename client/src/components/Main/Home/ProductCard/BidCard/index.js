import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    ThumbsupIcon,
    ThumbsdownIcon,
    PencilIcon,
    TrashIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../../../utils/ButtonComp'
import { bidStatusUpdate, bidDelete } from '../../../../../store/actions/bid'
import './BidCard.css'

const BidCard = ({ bid, productOwnerID, setIsBidMoreOpen, setIsBidEditOpen }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingBidStatusUpdate } = useSelector(
        (state) => state.bidStatusUpdate
    )
    const { loading: loadingBidDelete } = useSelector((state) => state.bidDelete)

    const handleBidStatusUpdate = (newBidStatus) => {
        dispatch(bidStatusUpdate(bid.product, bid._id, newBidStatus))
    }

    const handleBidPriceEdit = () => {
        setIsBidMoreOpen(false)
        setIsBidEditOpen(true)
    }

    return (
        <div className="bidCard">
            <Avatar
                src={`avatars/avatar${bid.bidOwner.avatar}.png`}
                className="bidCard__avatar"
                onClick={() => history.push(`/contact/${bid.bidOwner.username}`)}
            />
            <div className="bidCard__nameTime">
                <p
                    className="username"
                    onClick={() => history.push(`/contact/${bid.bidOwner.username}`)}
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

            {/* Product Owner Controls */}
            {bid.status === 'PENDING' &&
                String(productOwnerID) === String(user.userInfo._id) && (
                    <div className="icon">
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={() => handleBidStatusUpdate('ACCEPTED')}
                            modifyClass={
                                loadingBidStatusUpdate
                                    ? 'iconButton disabled'
                                    : 'iconButton'
                            }
                        >
                            <ThumbsupIcon size={18} />
                        </ButtonComp>
                        <ButtonComp
                            typeClass={'secondary'}
                            handleOnClick={() => handleBidStatusUpdate('REJECTED')}
                            modifyClass={
                                loadingBidStatusUpdate
                                    ? 'iconButton disabled'
                                    : 'iconButton'
                            }
                        >
                            <ThumbsdownIcon size={18} />
                        </ButtonComp>
                    </div>
                )}

            {/* Bid Owner Controls */}
            {bid.status === 'PENDING' &&
                String(bid.bidOwner._id) === String(user.userInfo._id) && (
                    <div className="icon">
                        <ButtonComp
                            typeClass={'primary'}
                            modifyClass={'iconButton'}
                            handleOnClick={handleBidPriceEdit}
                        >
                            <PencilIcon size={18} />
                        </ButtonComp>
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={
                                loadingBidDelete ? 'iconButton disabled' : 'iconButton'
                            }
                            handleOnClick={() =>
                                dispatch(bidDelete(bid.product, bid._id))
                            }
                        >
                            <TrashIcon size={18} />
                        </ButtonComp>
                    </div>
                )}
        </div>
    )
}

export default BidCard
