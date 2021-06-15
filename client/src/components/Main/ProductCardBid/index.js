import React, { useState, useEffect } from 'react'
import {
    MegaphoneIcon,
    PencilIcon,
    TrashIcon,
    PersonAddIcon,
} from '@primer/octicons-react'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonComp from '../../utils/ButtonComp'
import ProductImage from '../../utils/ProductImage'
import PriceBox from '../../utils/PriceBox'
import ConfirmModal from '../../utils/ConfirmModal'
import ProductDetails from '../../utils/ProductDetails'
import BidMoreAvatars from '../Home/ProductCard/BidMoreAvatars'
import BidEditInput from '../Home/ProductCard/BidEditInput'
import AvatarHeader from '../Home/ProductCard/AvatarHeader'
import { bidDelete } from '../../../store/actions/bid'
import { getUserLatestBid } from '../../../utils/getUserLatestBid'
import './ProductCardBid.css'

const ProductCardBid = ({ product }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { loading: loadingBidDelete } = useSelector((state) => state.bidDelete)
    const { user } = useSelector((state) => state.userLogin)

    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [userLatestBid, setUserLatestBid] = useState({ price: '' })
    const [bidVal, setBidVal] = useState('')
    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)

    // getting the latest bid of the logged in user on the current product
    useEffect(() => {
        setUserLatestBid(getUserLatestBid(product.bids, user.userInfo._id))
    }, [product.bids, user.userInfo._id])

    // to set the current bidVal based on the user's latest bid
    useEffect(() => {
        if (!userLatestBid.canPlaceBid) {
            setBidVal(userLatestBid.price)
        }
    }, [userLatestBid])

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(product._id, userLatestBid._id))
    }

    return (
        <>
            <div className="productCardBid">
                {/* Header */}
                <div className="productCardBid__header">
                    <AvatarHeader product={product} />

                    <div className="contact">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() =>
                                history.push(`/contact/${product.productOwner.username}`)
                            }
                        >
                            <PersonAddIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>

                {/* Image */}
                <ProductImage image={product.image.url} name={product.name} />

                {/* Details */}
                <ProductDetails name={product.name} description={product.description} />

                {/* Price */}
                <PriceBox productPrice={product.price} bids={product.bids} />

                {/* Footer */}
                <div className="productCardBid__bids">
                    <div className="productCardBid__myBid">
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
                    <ButtonComp
                        typeClass={'primary'}
                        modifyClass={'iconButton'}
                        handleOnClick={() => setIsBidEditOpen(true)}
                    >
                        <PencilIcon size={18} />
                    </ButtonComp>
                    <ButtonComp
                        typeClass={'secondary'}
                        modifyClass={'iconButton'}
                        handleOnClick={() => setIsBidDeleteOpen(true)}
                    >
                        <TrashIcon size={18} />
                    </ButtonComp>

                    {/* More Bids Avatar Group */}
                    <BidMoreAvatars
                        bids={product.bids}
                        productOwnerID={product.productOwner._id}
                        isBidMoreOpen={isBidMoreOpen}
                        setIsBidMoreOpen={setIsBidMoreOpen}
                        setIsBidEditOpen={setIsBidEditOpen}
                    />
                </div>

                {/* Bid Edit Input */}
                <BidEditInput
                    isOpen={isBidEditOpen}
                    setIsOpen={setIsBidEditOpen}
                    bidVal={bidVal}
                    setBidVal={setBidVal}
                    productID={product._id}
                    bidID={userLatestBid._id}
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
        </>
    )
}

export default ProductCardBid
