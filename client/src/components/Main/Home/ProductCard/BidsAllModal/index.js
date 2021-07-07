import React from 'react'
import _ from 'lodash'
import { XIcon } from '@primer/octicons-react'
import { useSelector } from 'react-redux'

import ModalComp from '../../../../utils/ModalComp'
import ButtonComp from '../../../../utils/ButtonComp'
import BidCard from '../BidCard'
import './BidsAllModal.scss'

const BidsAllModal = ({ bids, isOpen, setIsOpen, productOwnerID, setIsBidEditOpen }) => {
    const { user } = useSelector((state) => state.userLogin)

    return (
        <ModalComp isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
            <div className="bidsAllModal">
                <div className="bidsAllModal__header">
                    <h1>All Bids</h1>
                    <ButtonComp
                        typeClass={'secondary'}
                        modifyClass={'iconButton'}
                        handleOnClick={() => setIsOpen(false)}
                    >
                        <XIcon size={18} />
                    </ButtonComp>
                </div>
                {bids.length === 0 ? (
                    <div className="bidsAllModal__noBids">
                        {String(productOwnerID) === String(user.userInfo._id) ? (
                            <h3>
                                No attention seeked yet! Wait or try to make your product
                                more attractive.
                            </h3>
                        ) : (
                            <h3>No attention seeked yet! Be the first one.</h3>
                        )}
                    </div>
                ) : (
                    _.orderBy(bids, ['price'], ['desc']).map((bid) => (
                        <BidCard
                            key={bid._id}
                            bid={bid}
                            productOwnerID={productOwnerID}
                            setIsBidMoreOpen={setIsOpen}
                            setIsBidEditOpen={setIsBidEditOpen}
                            isInModal={true}
                        />
                    ))
                )}
            </div>
        </ModalComp>
    )
}

export default BidsAllModal
