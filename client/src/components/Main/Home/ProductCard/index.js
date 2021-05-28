import React, { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { TagIcon, MegaphoneIcon, PinIcon, XIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import sampleProduct from '../../../../assets/images/sample-product.jpg'
import ButtonComp from '../../../utils/ButtonComp'
import ModalComp from '../../../utils/ModalComp'
import BidCard from './BidCard'
import './ProductCard.css'

const ProductCard = () => {
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)

    return (
        <>
            <div className="productCard">
                {/* Header */}
                <div className="productCard__header">
                    <Avatar src="avatars/avatar10.png" className="productCard__avatar" />
                    <div className="productCard__nameTime">
                        <p>@blck_tie</p>
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

                {/* Details */}
                <div className="productCard__productDetails">
                    <h2 className="name">Camera 500X</h2>
                    <p className="description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
                        doloribus mollitia neque nemo labore doloremque!
                    </p>
                </div>

                {/* Image */}
                <div className="productCard__image">
                    <img
                        src={sampleProduct}
                        alt="sample-product"
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Price */}
                <div className="productCard__price">
                    <TagIcon size={18} />
                    <h3>Price</h3>
                    <span className="price">Rs 1,499</span>
                </div>

                {/* Bids */}
                <div className="productCard__bids">
                    <BidCard />
                    <BidCard />

                    <div
                        className="productCard__bidMore"
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

                {/* Action */}
                <div className="productCard__action">
                    <div className="productCard__bidPlace">
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
                        handleOnClick={() => {}}
                        text={'Follow'}
                    >
                        <PinIcon size={18} />
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

export default ProductCard
