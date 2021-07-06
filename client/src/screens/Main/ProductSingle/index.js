import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ReplyIcon } from '@primer/octicons-react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

import ProductSingleCard from '../../../components/Main/ProductSingleCard'
import ScreenLoader from '../../../components/utils/ScreenLoader'
import BlockHeader from '../../../components/utils/BlockHeader'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import ButtonComp from '../../../components/utils/ButtonComp'
import BidCard from '../../../components/Main/Home/ProductCard/BidCard'
import './ProductSingle.scss'

const ProductSingle = () => {
    const history = useHistory()

    const { loading: loadingProductSingle, product } = useSelector(
        (state) => state.productSingle
    )

    const [isBidEditOpen, setIsBidEditOpen] = useState(false)

    return (
        <>
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
                        <ProductSingleCard
                            product={product}
                            isBidEditOpen={isBidEditOpen}
                            setIsBidEditOpen={setIsBidEditOpen}
                        />

                        {product.isActive &&
                            _.orderBy(product.bids, ['price'], ['desc']).map((bid) => (
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
        </>
    )
}

export default ProductSingle
