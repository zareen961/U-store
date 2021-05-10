import { useState, useCallback } from 'react'

export const useForm = (initialVals = {}) => {
    const [inputVals, setInputVals] = useState(initialVals)

    const handleOnChange = (e) => {
        setInputVals({
            ...inputVals,
            [e.target.name]: e.target.value,
        })
    }

    const handleReset = useCallback(() => {
        setInputVals(initialVals)
    }, [initialVals])

    return { inputVals, handleOnChange, handleReset }
}
