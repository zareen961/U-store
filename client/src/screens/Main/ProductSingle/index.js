import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReplyIcon } from '@primer/octicons-react'
import { useHistory } from 'react-router-dom'

import SingleProductCard from '../../../components/Main/ProductSingle/SingleProductCard'
import ScreenLoader from '../../../components/utils/ScreenLoader'
import BlockHeader from '../../../components/utils/BlockHeader'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import ButtonComp from '../../../components/utils/ButtonComp'
import BidCard from '../../../components/Main/Home/ProductCard/BidCard'
import BidEditInput from '../../../components/Main/Home/ProductCard/BidEditInput'
import BidPlaceInput from '../../../components/Main/Home/ProductCard/BidPlaceInput'
import { getUserLatestBid } from '../../../utils/getUserLatestBid'
import './ProductSingle.css'

const ProductSingle = () => {
    const history = useHistory()

    const { loading: loadingProductSingle, product } = useSelector(
        (state) => state.productSingle
    )
    const { user } = useSelector((state) => state.userLogin)
    const { success: successBidPlace } = useSelector((state) => state.bidPlace)

    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [userLatestBid, setUserLatestBid] = useState({ canPlaceBid: true, price: '' })
    const [bidVal, setBidVal] = useState('')

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

    return (
        <div className="productSingle">
            <div className="productSingle__headerWrapper">
                <BlockHeader title={'Product Page'}>
                    <ButtonComp
                        typeClass={'secondary'}
                        text={'Go Back'}
                        handleOnClick={history.goBack}
                    >
                        <ReplyIcon size={18} />
                    </ButtonComp>
                </BlockHeader>
            </div>

            {loadingProductSingle ? (
                <ScreenLoader />
            ) : product && product._id ? (
                <div className="productSingle__bodyWrapper">
                    <SingleProductCard product={product} />
                    <div className="productSingle__place">
                        <BidPlaceInput
                            bidVal={bidVal}
                            setBidVal={setBidVal}
                            product={product}
                        />
                        <BidEditInput
                            isOpen={isBidEditOpen}
                            setIsOpen={setIsBidEditOpen}
                            product={{ _id: product._id }}
                            bidID={userLatestBid._id}
                            bidVal={bidVal}
                            setBidVal={setBidVal}
                        />
                    </div>
                    {product.bids.map((bid) => (
                        <BidCard
                            key={bid._id}
                            bid={{ ...bid, product: product._id }}
                            productOwnerID={product.productOwner._id}
                            isInModal={true}
                            setIsBidEditOpen={setIsBidEditOpen}
                        />
                    ))}
                </div>
            ) : (
                <NoItemMessage
                    title={'Something went wrong!'}
                    text={
                        "Maybe you are trying to access this page directly. Directly putting the url won't work."
                    }
                />
            )}
        </div>
    )
}

export default ProductSingle
