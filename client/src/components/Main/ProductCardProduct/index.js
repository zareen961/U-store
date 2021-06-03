import React, { useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { TagIcon, MegaphoneIcon, XIcon, ArrowUpIcon } from '@primer/octicons-react'
import ButtonComp from '../../utils/ButtonComp'

import sampleProduct from '../../../assets/images/sample-product.jpg'
import ModalComp from '../../utils/ModalComp'
import BidCard from '../Home/ProductCard/BidCard'
import './ProductCardProduct.css'

const description = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
veritatis consectetur debitis, nostrum laboriosam exercitationem
inventore cum! Nemo eos error deleniti dolore excepturi culpa
blanditiis aperiam deserunt perspiciatis, delectus fugiat!`

const ProductCardProduct = () => {
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)

    return (
        <>
            <div className="productCardProduct">
                {/* Header */}
                <div className="productCardProduct__header">
                    <div className="productCardProduct__nameTime">
                        <h2>Camera 500X</h2>
                        <span>2 hours ago</span>
                    </div>

                    <ClickAwayListener onClickAway={() => setIsMenuTrayOpen(false)}>
                        <IconButton
                            className="icon"
                            onClick={() => setIsMenuTrayOpen(!isMenuTrayOpen)}
                        >
                            <MoreHorizIcon fontSize="large" />
                        </IconButton>
                    </ClickAwayListener>
                    <ul className={isMenuTrayOpen ? 'menuTray open' : 'menuTray'}>
                        <li>Edit</li>
                        <li className="line"></li>
                        <li>Delete</li>
                    </ul>
                </div>

                {/* Image */}
                <div className="productCardProduct__image">
                    <img
                        src={sampleProduct}
                        alt="sample-product"
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Details */}
                <div className="productCardProduct__productDetails">
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
                <div className="productCardProduct__price">
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
                <div className="productCardProduct__bids">
                    <div className="productCardProduct__bidsCount">
                        <MegaphoneIcon size={18} />
                        <h3>Total Bids:</h3>
                        <span className="bidsCount">7</span>
                    </div>
                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={'View Bids'}
                    />
                </div>
            </div>

            {/* Image Modal */}
            <ModalComp
                isOpen={isImageOpen}
                handleOnClose={() => setIsImageOpen(false)}
                maxWidth={'lg'}
            >
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
            <ModalComp
                isOpen={isBidMoreOpen}
                handleOnClose={() => setIsBidMoreOpen(false)}
            >
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
                    {/* {product.bids.map((bid) => (
                        <BidCard key={bid._id} bid={bid} />
                    ))} */}
                </div>
            </ModalComp>
        </>
    )
}

export default ProductCardProduct
