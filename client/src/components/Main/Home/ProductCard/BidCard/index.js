import React, { useState } from 'react'
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
import ChipComp from '../../../../utils/ChipComp'
import ConfirmModal from '../../../../utils/ConfirmModal'
import { bidStatusUpdate, bidDelete } from '../../../../../store/actions/bid'
import './BidCard.css'

const BidCard = ({
    bid,
    productOwnerID,
    setIsBidMoreOpen,
    setIsBidEditOpen,
    isInModal = false,
}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingBidStatusUpdate } = useSelector(
        (state) => state.bidStatusUpdate
    )
    const { loading: loadingBidDelete } = useSelector((state) => state.bidDelete)

    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)
    const [isBidStatusUpdateOpen, setIsBidStatusUpdateOpen] = useState(false)

    // function to accept/reject a bid
    const handleBidStatusUpdate = (newBidStatus) => {
        dispatch(
            bidStatusUpdate(
                bid.product._id ? bid.product._id : bid.product,
                bid._id,
                newBidStatus
            )
        )
    }

    // function to edit bid price
    const handleBidPriceEdit = () => {
        setIsBidMoreOpen(false)
        setIsBidEditOpen(true)
    }

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(bid.product._id ? bid.product._id : bid.product, bid._id))
    }

    return (
        <>
            <div className="bidCard">
                <Avatar
                    src={`avatars/avatar${bid.bidOwner.avatar}.png`}
                    className="bidCard__avatar"
                    onClick={() => history.push(`/contact/${bid.bidOwner.username}`)}
                />

                {bid.status === 'PENDING' &&
                (bid.bidOwner._id === user.userInfo._id ||
                    productOwnerID === user.userInfo._id) &&
                !isInModal ? (
                    <div className="bidCard__nameTime">
                        <p
                            className="username"
                            onClick={() =>
                                history.push(`/contact/${bid.bidOwner.username}`)
                            }
                        >
                            @{bid.bidOwner.username.substring(0, 6)}...
                        </p>
                        <span>{moment(bid.createdAt).fromNow().substring(0, 6)}...</span>
                    </div>
                ) : (
                    <div className="bidCard__nameTime">
                        <p
                            className="username"
                            onClick={() =>
                                history.push(`/contact/${bid.bidOwner.username}`)
                            }
                        >
                            @{bid.bidOwner.username}
                        </p>
                        <span>{moment(bid.createdAt).fromNow()}</span>
                    </div>
                )}

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
                                    loadingBidDelete
                                        ? 'iconButton disabled'
                                        : 'iconButton'
                                }
                                handleOnClick={() => setIsBidDeleteOpen(true)}
                            >
                                <TrashIcon size={18} />
                            </ButtonComp>
                        </div>
                    )}

                {/* Current Status Chip */}
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

            {/* Confirm Bid Delete Modal */}
            <ConfirmModal
                isOpen={isBidDeleteOpen}
                setIsOpen={setIsBidDeleteOpen}
                handleOnConfirm={handleBidDelete}
                isSecure={false}
                isLoading={loadingBidDelete}
            />

            {/* Confirm Bid Accept/Reject Modal */}
            <ConfirmModal
                isOpen={isBidStatusUpdateOpen}
                setIsOpen={setIsBidStatusUpdateOpen}
                handleOnConfirm={handleBidStatusUpdate}
                isSecure={false}
                isLoading={loadingBidStatusUpdate}
            />
        </>
    )
}

export default BidCard
