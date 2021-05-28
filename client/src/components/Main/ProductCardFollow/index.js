import React, { useState } from 'react'
import {
    TagIcon,
    MegaphoneIcon,
    XIcon,
    ArrowUpIcon,
    PinIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'

import sampleProduct from '../../../assets/images/sample-product.jpg'
import ButtonComp from '../../utils/ButtonComp'
import ModalComp from '../../utils/ModalComp'
import BidCard from '../Home/ProductCard/BidCard'
import './ProductCardFollow.css'

const description = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
veritatis consectetur debitis, nostrum laboriosam exercitationem
inventore cum! Nemo eos error deleniti dolore excepturi culpa
blanditiis aperiam deserunt perspiciatis, delectus fugiat!`

const ProductCardFollow = () => {
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)

    return (
        <>
            <div className="productCardFollow">
                {/* Header */}
                <div className="productCardFollow__header">
                    <Avatar
                        src="avatars/avatar10.png"
                        className="productCardFollow__avatar"
                    />
                    <div className="productCardFollow__nameTime">
                        <p>@blck_tie</p>
                        <span>2 hours ago</span>
                    </div>

                    <div className="contact">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => {}}
                        >
                            <PinIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>

                {/* Image */}
                <div className="productCardFollow__image">
                    <img
                        src={sampleProduct}
                        alt="sample-product"
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Details */}
                <div className="productCardFollow__productDetails">
                    <h2 className="name">Camera 500X</h2>
                    {description.length > 90 ? (
                        <p
                            className={
                                isReadMoreOpen ? 'description open' : 'description'
                            }
                        >
                            {description.substring(0, 80)}
                            <span>
                                {isReadMoreOpen ? description.substring(80) : '...'}
                            </span>
                            <button
                                className="readMoreButton"
                                onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                            >
                                {isReadMoreOpen ? 'Show Less' : 'Read More'}
                            </button>
                        </p>
                    ) : (
                        <p className="description">{description}</p>
                    )}
                </div>

                {/* Price */}
                <div className="productCardFollow__price">
                    <div className="sellerPrice">
                        <div className="priceWrapper">
                            <TagIcon size={18} />
                            <h3>Price</h3>
                        </div>
                        <span className="price">Rs 1,499</span>
                    </div>
                    <div className="highestBid">
                        <div className="priceWrapper">
                            <ArrowUpIcon size={18} />
                            <h3>Highest Bid</h3>
                        </div>
                        <span className="price">Rs 1,499</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="productCardFollow__bids">
                    <div className="productCardFollow__bidPlace">
                        <MegaphoneIcon size={20} />
                        <input type="number" placeholder="Place a bid" />
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={() => {}}
                            modifyClass={'insideInputButton'}
                            text={'Place'}
                        />
                    </div>

                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={'View Bids'}
                    />
                </div>
            </div>

            {/* Image Modal */}
            <ModalComp isOpen={isImageOpen} setIsOpen={setIsImageOpen} maxWidth={'lg'}>
                <div className="productCard__imageModal">
                    <img src={sampleProduct} alt="sample-product" />
                    <div className="closeButtonWrapper">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => setIsImageOpen(false)}
                        >
                            <XIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>
            </ModalComp>

            {/* All Bids Modal */}
            <ModalComp isOpen={isBidMoreOpen} setIsOpen={setIsBidMoreOpen}>
                <div className="productCard__moreBids">
                    <div className="productCard__moreBidsHeader">
                        <h1>All Bids</h1>
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => setIsBidMoreOpen(false)}
                        >
                            <XIcon size={18} />
                        </ButtonComp>
                    </div>
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                    <BidCard />
                </div>
            </ModalComp>
        </>
    )
}

export default ProductCardFollow
