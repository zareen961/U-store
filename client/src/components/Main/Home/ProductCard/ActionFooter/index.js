import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MegaphoneIcon, PinIcon, PencilIcon, TrashIcon } from '@primer/octicons-react'
import NumberFormat from 'react-number-format'

import ButtonComp from '../../../../utils/ButtonComp'
import TooltipComp from '../../../../utils/TooltipComp'
import { bidDelete } from '../../../../../store/actions/bid'
import { productFollowToggle } from '../../../../../store/actions/product'
import ConfirmModal from '../../../../utils/ConfirmModal'
import BidEditInput from '../BidEditInput'
import BidPlaceInput from '../BidPlaceInput'
import { getUserLatestBid } from '../../../../../utils/getUserLatestBid'
import { checkIfUserFollow } from '../../../../../utils/checkIfUserFollow'

import './ActionFooter.scss'

const ActionFooter = ({ product, isBidEditOpen, setIsBidEditOpen }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingProductFollowToggle } = useSelector(
        (state) => state.productFollowToggle
    )
    const { success: successBidPlace } = useSelector((state) => state.bidPlace)
    const { loading: loadingBidDelete, success: successBidDelete } = useSelector(
        (state) => state.bidDelete
    )

    const [bidVal, setBidVal] = useState('')
    const [userLatestBid, setUserLatestBid] = useState({ canPlaceBid: true, price: '' })
    const [isUserFollow, setIsUserFollow] = useState(false)
    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)

    // getting/updating the latest bid (if any) of the logged in user on the current product
    useEffect(() => {
        if ((user && user.userInfo) || successBidPlace) {
            setUserLatestBid(getUserLatestBid(product.bids, user.userInfo._id))
        }
    }, [user, user.userInfo, successBidPlace, product.bids])

    // to set the current bidVal based on the user's latest bid
    useEffect(() => {
        if (!userLatestBid.canPlaceBid) {
            setBidVal(userLatestBid.price)
        }
    }, [userLatestBid])

    // to update the logged in user's following status on the current product
    useEffect(() => {
        if (user && user.userInfo) {
            setIsUserFollow(checkIfUserFollow(user.userInfo.following, product._id))
        }
    }, [user, user.userInfo, product._id])

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(product._id, userLatestBid._id))
    }

    // to clear the bid input field after the bid is deleted
    useEffect(() => {
        if (successBidDelete) {
            setBidVal('')
            setIsBidDeleteOpen(false)
        }
    }, [successBidDelete])

    return (
        <>
            {String(user.userInfo._id) !== String(product.productOwner._id) &&
                (userLatestBid.canPlaceBid ? (
                    <div className="actionFooter">
                        <BidPlaceInput
                            bidVal={bidVal}
                            setBidVal={setBidVal}
                            product={product}
                        />

                        {!userLatestBid.hasOwnProperty('_id') && (
                            <div style={{ marginLeft: '10px' }}>
                                <ButtonComp
                                    typeClass={isUserFollow ? 'primary' : 'secondary'}
                                    handleOnClick={() =>
                                        dispatch(productFollowToggle(product))
                                    }
                                    text={isUserFollow ? 'Unfollow' : 'Follow'}
                                    modifyClass={
                                        loadingProductFollowToggle ? 'disabled' : ''
                                    }
                                >
                                    <PinIcon size={18} />
                                </ButtonComp>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="actionFooter">
                        <div className="actionFooter__myBid">
                            <MegaphoneIcon size={18} />
                            <h3>My Bid:</h3>
                            <span className="myBidPrice">
                                <NumberFormat
                                    value={userLatestBid.price}
                                    prefix={'Rs '}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            </span>
                        </div>

                        <TooltipComp placement={'top'} title={'Edit Bid'}>
                            <ButtonComp
                                typeClass={'primary'}
                                modifyClass={'iconButton'}
                                handleOnClick={() => setIsBidEditOpen(true)}
                            >
                                <PencilIcon size={18} />
                            </ButtonComp>
                        </TooltipComp>

                        <TooltipComp placement={'top'} title={'Delete Bid'}>
                            <ButtonComp
                                typeClass={'secondary'}
                                modifyClass={'iconButton'}
                                handleOnClick={() => setIsBidDeleteOpen(true)}
                            >
                                <TrashIcon size={18} />
                            </ButtonComp>
                        </TooltipComp>

                        {/* Bid Edit Input */}
                        <BidEditInput
                            isOpen={isBidEditOpen}
                            setIsOpen={setIsBidEditOpen}
                            bidVal={bidVal}
                            setBidVal={setBidVal}
                            product={product}
                            bidID={userLatestBid._id}
                        />
                    </div>
                ))}

            {/* Confirm Bid Delete Modal */}
            <ConfirmModal
                isOpen={isBidDeleteOpen}
                setIsOpen={setIsBidDeleteOpen}
                handleOnConfirm={handleBidDelete}
                isSecure={false}
                isLoading={loadingBidDelete}
            />
        </>
    )
}

export default ActionFooter
