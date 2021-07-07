import React from 'react'
import { MegaphoneIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../../../utils/ButtonComp'
import FormLoader from '../../../../utils/FormLoader'
import { bidPlace } from '../../../../../store/actions/bid'
import { alertAdd } from '../../../../../store/actions/ui'
import './BidPlaceInput.scss'

const BidPlaceInput = ({ bidVal, setBidVal, product, isFollowingScreen = false }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { loading: loadingBidPlace } = useSelector((state) => state.bidPlace)

    // function to place a new bid
    const handleBidPlace = () => {
        if (Number(bidVal) >= 0 && bidVal !== '') {
            dispatch(bidPlace(product, Number(bidVal), isFollowingScreen && history))
        } else {
            dispatch(alertAdd('Raise a suitable amount!', 'error'))
        }
    }

    return (
        <div className="bidPlaceInput">
            <MegaphoneIcon size={20} />
            <input
                type="number"
                placeholder={isFollowingScreen ? 'Place' : 'Place a bid'}
                value={bidVal}
                onChange={(e) => setBidVal(e.target.value)}
            />
            <ButtonComp
                typeClass={'primary'}
                handleOnClick={handleBidPlace}
                modifyClass="insideInputButton"
                text={'Place'}
            />

            <FormLoader
                loading={loadingBidPlace}
                modifyClass={'bidPlaceLoader'}
                loaderSizeClass={'small'}
            />
        </div>
    )
}

export default BidPlaceInput
