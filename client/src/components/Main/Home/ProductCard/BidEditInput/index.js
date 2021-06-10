import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MegaphoneIcon, XIcon } from '@primer/octicons-react'

import ButtonComp from '../../../../utils/ButtonComp'
import BidInputLoader from '../../../../utils/BidInputLoader'
import { bidPriceUpdate } from '../../../../../store/actions/bid'
import { alertAdd } from '../../../../../store/actions/alert'
import './BidEditInput.css'

const BidEditInput = ({ isOpen, setIsOpen, bidVal, setBidVal, productID, bidID }) => {
    const dispatch = useDispatch()

    const { loading, success } = useSelector((state) => state.bidPriceUpdate)

    const handleBidEdit = () => {
        if (Number(bidVal) < 0 || bidVal === '') {
            dispatch(alertAdd('Place a suitable bid!', 'error'))
        } else {
            dispatch(bidPriceUpdate(productID, bidID, Number(bidVal)))
        }
    }

    useEffect(() => {
        if (success) {
            setIsOpen(false)
        }
    }, [success])

    return (
        <div className={isOpen ? 'bidEditInput open' : 'bidEditInput'}>
            <div className="bidEditInput__wrapper">
                <MegaphoneIcon size={20} />
                <input
                    type="number"
                    placeholder="Adjust your bid"
                    value={bidVal}
                    onChange={(e) => setBidVal(e.target.value)}
                />
                <ButtonComp
                    typeClass={'primary'}
                    handleOnClick={handleBidEdit}
                    modifyClass={'insideInputButton'}
                    text={'Update'}
                />
            </div>
            <ButtonComp
                typeClass={'secondary'}
                handleOnClick={() => setIsOpen(false)}
                modifyClass={'iconButton'}
            >
                <XIcon size={18} />
            </ButtonComp>

            <BidInputLoader isLoading={loading} />
        </div>
    )
}

export default BidEditInput
