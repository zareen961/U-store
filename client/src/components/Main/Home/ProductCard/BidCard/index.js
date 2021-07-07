import React, { useState, useEffect } from 'react'
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
import TooltipComp from '../../../../utils/TooltipComp'
import ConfirmModal from '../../../../utils/ConfirmModal'
import { bidStatusUpdate, bidDelete } from '../../../../../store/actions/bid'
import { handleGetContact } from '../../../../../utils/handleGetContact'
import './BidCard.scss'

const BidCard = ({
    bid,
    productOwnerID,
    setIsBidMoreOpen,
    setIsBidEditOpen,
    isInModal = false,
}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { user, success: successUserLogin } = useSelector((state) => state.userLogin)
    const { loading: loadingBidStatusUpdate, success: successBidStatusUpdate } =
        useSelector((state) => state.bidStatusUpdate)
    const { loading: loadingBidDelete, success: successBidDelete } = useSelector(
        (state) => state.bidDelete
    )

    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)
    const [isBidAcceptOpen, setIsBidAcceptOpen] = useState(false)
    const [isBidRejectOpen, setIsBidRejectOpen] = useState(false)

    // function to accept a bid
    const handleBidAccept = () => {
        dispatch(
            bidStatusUpdate(
                bid.product._id ? bid.product._id : bid.product,
                bid._id,
                'ACCEPTED'
            )
        )
    }

    // function to reject a bid
    const handleBidReject = () => {
        dispatch(
            bidStatusUpdate(
                bid.product._id ? bid.product._id : bid.product,
                bid._id,
                'REJECTED'
            )
        )
    }

    // to close the confirm modal after a bid gets accepted/rejected
    useEffect(() => {
        if (successBidStatusUpdate) {
            setIsBidAcceptOpen(false)
            setIsBidRejectOpen(false)
        }
    }, [successBidStatusUpdate])

    // function to edit bid price
    const handleBidPriceEdit = () => {
        if (setIsBidMoreOpen) setIsBidMoreOpen(false)
        setIsBidEditOpen((prevIsBidEditOpen) => !prevIsBidEditOpen)
    }

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(bid.product._id ? bid.product._id : bid.product, bid._id))
    }

    // to close the confirm modal after a bids gets deleted
    useEffect(() => {
        if (successBidDelete) {
            setIsBidDeleteOpen(false)
        }
    }, [successBidDelete])

    // setting up the handleGetContact function
    const handleCallGetContact = () =>
        handleGetContact({
            dispatch,
            history,
            successUserLogin,
            username: bid.bidOwner.username,
            productID: bid.product,
        })

    return (
        <>
            <div className="bidCard">
                <Avatar
                    src={`/avatars/avatar${bid.bidOwner.avatar}.png`}
                    className="bidCard__avatar"
                    onClick={handleCallGetContact}
                />

                {bid.status === 'PENDING' &&
                (bid.bidOwner._id === user.userInfo._id ||
                    productOwnerID === user.userInfo._id) &&
                !isInModal ? (
                    <div className="bidCard__nameTime">
                        <p className="username" onClick={handleCallGetContact}>
                            @{bid.bidOwner.username.substring(0, 6)}...
                        </p>
                        <span>{moment(bid.createdAt).fromNow().substring(0, 6)}...</span>
                    </div>
                ) : (
                    <div className="bidCard__nameTime">
                        <p className="username" onClick={handleCallGetContact}>
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
                            <TooltipComp placement={'top'} title={'Accept Bid'}>
                                <ButtonComp
                                    typeClass={'primary'}
                                    handleOnClick={() => setIsBidAcceptOpen(true)}
                                    modifyClass={
                                        loadingBidStatusUpdate
                                            ? 'iconButton disabled'
                                            : 'iconButton'
                                    }
                                >
                                    <ThumbsupIcon size={18} />
                                </ButtonComp>
                            </TooltipComp>

                            <TooltipComp placement={'top'} title={'Reject Bid'}>
                                <ButtonComp
                                    typeClass={'secondary'}
                                    handleOnClick={() => setIsBidRejectOpen(true)}
                                    modifyClass={
                                        loadingBidStatusUpdate
                                            ? 'iconButton disabled'
                                            : 'iconButton'
                                    }
                                >
                                    <ThumbsdownIcon size={18} />
                                </ButtonComp>
                            </TooltipComp>
                        </div>
                    )}

                {/* Bid Owner Controls */}
                {bid.status === 'PENDING' &&
                    String(bid.bidOwner._id) === String(user.userInfo._id) && (
                        <div className="icon">
                            <TooltipComp placement={'top'} title={'Edit Bid'}>
                                <ButtonComp
                                    typeClass={'primary'}
                                    modifyClass={'iconButton'}
                                    handleOnClick={handleBidPriceEdit}
                                >
                                    <PencilIcon size={18} />
                                </ButtonComp>
                            </TooltipComp>

                            <TooltipComp placement={'top'} title={'Delete Bid'}>
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
                            </TooltipComp>
                        </div>
                    )}

                {/* Current Status Chip */}
                {bid.bidOwner.username === 'ustore_user' && bid.bidOwner.avatar === 0 ? (
                    <ChipComp
                        text={'User Deleted'}
                        type={'error'}
                        isPositionAbsolute={true}
                    />
                ) : (
                    <ChipComp
                        text={bid.status}
                        type={
                            bid.status === 'REJECTED'
                                ? 'error'
                                : bid.status === 'ACCEPTED'
                                ? 'success'
                                : 'neutral'
                        }
                        isPositionAbsolute={true}
                    />
                )}
            </div>

            {/* Confirm Bid Delete Modal */}
            <ConfirmModal
                isOpen={isBidDeleteOpen}
                setIsOpen={setIsBidDeleteOpen}
                handleOnConfirm={handleBidDelete}
                isSecure={false}
                isLoading={loadingBidDelete}
            />

            {/* Confirm Bid Accept Modal */}
            <ConfirmModal
                isOpen={isBidAcceptOpen}
                setIsOpen={setIsBidAcceptOpen}
                handleOnConfirm={handleBidAccept}
                isSecure={false}
                isLoading={loadingBidStatusUpdate}
            />

            {/* Confirm Bid Reject Modal */}
            <ConfirmModal
                isOpen={isBidRejectOpen}
                setIsOpen={setIsBidRejectOpen}
                handleOnConfirm={handleBidReject}
                isSecure={false}
                isLoading={loadingBidStatusUpdate}
            />
        </>
    )
}

export default BidCard
