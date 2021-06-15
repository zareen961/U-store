import React, { useState, useEffect } from 'react'
import {
    MegaphoneIcon,
    PencilIcon,
    TrashIcon,
    PersonAddIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonComp from '../../utils/ButtonComp'
import ProductImage from '../../utils/ProductImage'
import PriceBox from '../../utils/PriceBox'
import ConfirmModal from '../../utils/ConfirmModal'
import BidMoreAvatars from '../Home/ProductCard/BidMoreAvatars'
import BidEditInput from '../Home/ProductCard/BidEditInput'
import { bidDelete } from '../../../store/actions/bid'
import { getUserLatestBid } from '../../../utils/getUserLatestBid'
import './ProductCardBid.css'

const ProductCardBid = ({ product }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { loading: loadingBidDelete } = useSelector((state) => state.bidDelete)
    const { user } = useSelector((state) => state.userLogin)

    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [userLatestBid, setUserLatestBid] = useState({ price: '' })
    const [bidVal, setBidVal] = useState(userLatestBid.price)
    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)

    useEffect(() => {
        setUserLatestBid(getUserLatestBid(product.bids, user.userInfo._id))
    }, [product.bids, user.userInfo._id])

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(product._id, userLatestBid._id))
    }

    return (
        <>
            <div className="productCardBid">
                {/* Header */}
                <div className="productCardBid__header">
                    <Avatar
                        src={`avatars/avatar${product.productOwner.avatar}.png`}
                        className="productCardBid__avatar"
                        onClick={() =>
                            history.push(`/contact/${product.productOwner.username}`)
                        }
                    />
                    <div className="productCardBid__nameTime">
                        <p
                            className="username"
                            onClick={() =>
                                history.push(`/contact/${product.productOwner.username}`)
                            }
                        >
                            @{product.productOwner.username}
                        </p>
                        <span>{moment(product.createdAt).fromNow()}</span>
                    </div>

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
                <div className="productCardBid__productDetails">
                    <h2 className="name">{product.name}</h2>
                    {product.description.length > 90 ? (
                        <p
                            className={
                                isReadMoreOpen ? 'description open' : 'description'
                            }
                        >
                            {product.description.substring(0, 80)}
                            <span>
                                {isReadMoreOpen
                                    ? product.description.substring(80)
                                    : '...'}
                            </span>
                            <button
                                className="readMoreButton"
                                onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                            >
                                {isReadMoreOpen ? 'Show Less' : 'Read More'}
                            </button>
                        </p>
                    ) : (
                        <p className="description">{product.description}</p>
                    )}
                </div>

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
