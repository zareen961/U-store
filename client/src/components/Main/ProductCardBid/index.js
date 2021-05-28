import React, { useState } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import {
    TagIcon,
    MegaphoneIcon,
    XIcon,
    PencilIcon,
    TrashIcon,
    PersonAddIcon,
    ArrowUpIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'

import sampleProduct from '../../../assets/images/sample-product.jpg'
import ButtonComp from '../../utils/ButtonComp'
import ModalComp from '../../utils/ModalComp'
import BidCard from '../Home/ProductCard/BidCard'
import './ProductCardBid.css'

const description = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
veritatis consectetur debitis, nostrum laboriosam exercitationem
inventore cum! Nemo eos error deleniti dolore excepturi culpa
blanditiis aperiam deserunt perspiciatis, delectus fugiat!`

const ProductCardBid = () => {
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)

    return (
        <>
            <div className="productCardBid">
                {/* Header */}
                <div className="productCardBid__header">
                    <Avatar
                        src="avatars/avatar10.png"
                        className="productCardBid__avatar"
                    />
                    <div className="productCardBid__nameTime">
                        <p>@blck_tie</p>
                        <span>2 hours ago</span>
                    </div>

                    <div className="contact">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => {}}
                        >
                            <PersonAddIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>

                {/* Image */}
                <div className="productCardBid__image">
                    <img
                        src={sampleProduct}
                        alt="sample-product"
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Details */}
                <div className="productCardBid__productDetails">
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
                <div className="productCardBid__price">
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
                <div className="productCardBid__bids">
                    <div className="productCardBid__myBid">
                        <MegaphoneIcon size={18} />
                        <h3>My Bid:</h3>
                        <span className="bidsCount">Rs 1,200</span>
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
                        handleOnClick={() => {}}
                    >
                        <TrashIcon size={18} />
                    </ButtonComp>
                    <div
                        className="productCardBid__bidMore"
                        onClick={() => setIsBidMoreOpen(true)}
                    >
                        <AvatarGroup max={3}>
                            <Avatar
                                alt="Remy Sharp"
                                src="avatars/avatar6.png"
                                className="avatar"
                            />
                            <Avatar
                                alt="Travis Howard"
                                src="avatars/avatar2.png"
                                className="avatar"
                            />
                            <Avatar
                                alt="Cindy Baker"
                                src="avatars/avatar5.png"
                                className="avatar"
                            />
                            <Avatar
                                alt="Agnes Walker"
                                src="avatars/avatar9.png"
                                className="avatar"
                            />
                            <Avatar
                                alt="Trevor Henderson"
                                src="avatars/avatar1.png"
                                className="avatar"
                            />
                        </AvatarGroup>
                    </div>
                </div>

                {/* Bid Edit Input */}
                <div
                    className={
                        isBidEditOpen
                            ? 'productCardBid__bidEditWrapper open'
                            : 'productCardBid__bidEditWrapper'
                    }
                >
                    <div className="productCard__bidEdit">
                        <MegaphoneIcon size={20} />
                        <input type="number" placeholder="Adjust your bid" />
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={() => {}}
                            modifyClass={'insideInputButton'}
                            text={'Update'}
                        />
                    </div>
                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidEditOpen(false)}
                        modifyClass={'iconButton'}
                    >
                        <XIcon size={18} />
                    </ButtonComp>
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

export default ProductCardBid
