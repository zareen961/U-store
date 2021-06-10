import React from 'react'
import _ from 'lodash'
import { XIcon } from '@primer/octicons-react'

import ModalComp from '../../../../utils/ModalComp'
import ButtonComp from '../../../../utils/ButtonComp'
import BidCard from '../BidCard'
import './BidsAllModal.css'

const BidsAllModal = ({ bids, isOpen, setIsOpen, productOwnerID, setIsBidEditOpen }) => {
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
                {_.orderBy(bids, ['price'], ['desc']).map((bid) => (
                    <BidCard
                        key={bid._id}
                        bid={bid}
                        productOwnerID={productOwnerID}
                        setIsBidMoreOpen={setIsOpen}
                        setIsBidEditOpen={setIsBidEditOpen}
                    />
                ))}
            </div>
        </ModalComp>
    )
}

export default BidsAllModal
