import { useState, useCallback } from 'react'

export const useForm = (initialVals = {}) => {
    const [inputVals, setInputVals] = useState(initialVals)

    const customSetInputVals = useCallback((key, value) => {
        setInputVals((prevInputVals) => ({
            ...prevInputVals,
            [key]: value,
        }))
    }, [])

    const handleOnChange = (e) => {
        setInputVals((prevInputVals) => ({
            ...prevInputVals,
            [e.target.name]: e.target.value,
        }))
    }

    const handleReset = useCallback(() => {
        setInputVals(initialVals)
    }, [initialVals])

    return { inputVals, customSetInputVals, handleOnChange, handleReset }
}
