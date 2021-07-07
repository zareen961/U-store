import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import _ from 'lodash'

import BidsAllModal from '../BidsAllModal'
import TooltipComp from '../../../../utils/TooltipComp'
import './BidMoreAvatars.scss'

const BidMoreAvatars = ({
    bids,
    sliceBy = 0,
    productOwnerID,
    isBidMoreOpen,
    setIsBidMoreOpen,
    setIsBidEditOpen,
    isHomeScreen = false,
}) => {
    return (
        <>
            <div
                className="bidMoreAvatars"
                onClick={() => setIsBidMoreOpen(true)}
                style={{ alignSelf: isHomeScreen ? 'flex-end' : 'center' }}
            >
                <TooltipComp placement={'top'} title={'View All Bids'}>
                    <AvatarGroup max={3}>
                        {_.orderBy(bids, ['price'], ['desc'])
                            .slice(sliceBy)
                            .map((bid) => (
                                <Avatar
                                    key={bid._id}
                                    alt={bid.bidOwner.username}
                                    src={`avatars/avatar${bid.bidOwner.avatar}.png`}
                                    className="avatar"
                                />
                            ))}
                    </AvatarGroup>
                </TooltipComp>
            </div>

            {/* All Bids Modal */}
            <BidsAllModal
                bids={bids}
                isOpen={isBidMoreOpen}
                setIsOpen={setIsBidMoreOpen}
                productOwnerID={productOwnerID}
                setIsBidEditOpen={setIsBidEditOpen}
            />
        </>
    )
}

export default BidMoreAvatars
