import { useState } from 'react'

export const useForm = (initialVals = {}) => {
    const [inputVals, setInputVals] = useState(initialVals)

    const handleOnChange = (e) => {
        setInputVals({
            ...inputVals,
            [e.target.name]: e.target.value,
        })
    }

    const handleReset = () => {
        setInputVals(initialVals)
    }

    return { inputVals, handleOnChange, handleReset }
}
