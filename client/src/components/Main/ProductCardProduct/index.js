import React, { useState, useEffect } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { MegaphoneIcon } from '@primer/octicons-react'
import ButtonComp from '../../utils/ButtonComp'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import { productDelete } from '../../../store/actions/product'
import ConfirmModal from '../../utils/ConfirmModal'
import PriceBox from '../../utils/PriceBox'
import ProductImage from '../../utils/ProductImage'
import './ProductCardProduct.css'

const ProductCardProduct = ({ product }) => {
    const dispatch = useDispatch()

    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)

    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )

    // product delete function
    const handleProductDelete = () => {
        dispatch(productDelete(product._id))
    }

    // to close the confirm modal on product delete success
    useEffect(() => {
        if (successProductDelete) {
            setIsProductDeleteOpen(false)
        }
    }, [successProductDelete])

    return (
        <>
            <div className="productCardProduct">
                {/* Header */}
                <div className="productCardProduct__header">
                    <div className="productCardProduct__nameTime">
                        <h2>{product.name}</h2>
                        <span>{moment(product.createdAt).fromNow()}</span>
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
                        <li onClick={() => setIsProductDeleteOpen(true)}>Delete</li>
                    </ul>
                </div>

                {/* Image */}
                <ProductImage image={product.image.url} name={product.name} />

                {/* Details */}
                <div className="productCardProduct__productDetails">
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
                <div className="productCardProduct__bids">
                    <div className="productCardProduct__bidsCount">
                        <MegaphoneIcon size={18} />
                        <h3>Total Bids:</h3>
                        <span className="bidsCount">{product.bids.length}</span>
                    </div>
                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={'View Bids'}
                    />
                </div>
            </div>

            {/* All Bids Modal */}
            <BidsAllModal
                bids={product.bids}
                isOpen={isBidMoreOpen}
                setIsOpen={setIsBidMoreOpen}
                productOwnerID={product.productOwner}
            />

            {/* Confirm Product Delete Modal */}
            <ConfirmModal
                isOpen={isProductDeleteOpen}
                setIsOpen={setIsProductDeleteOpen}
                handleOnConfirm={handleProductDelete}
                isSecure={false}
                isLoading={loadingProductDelete}
            />
        </>
    )
}

export default ProductCardProduct
