import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import ConfirmModal from '../utils/ConfirmModal'
import Loader from '../utils/Loader'
import SelectOrAdd from '../utils/SelectOrAdd'

import './CollegeForm.css'

const CollegeForm = ({
    handleDispatch,
    loading,
    success,
    loadingCollegeData,
    collegeData,
    isAdd,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [state, setState] = useState(null)
    const [city, setCity] = useState(null)
    const [college, setCollege] = useState(null)

    const handleReset = () => {
        setState(null)
        setCity(null)
        setCollege(null)
        setPassword('')
    }

    useEffect(() => {
        if (success) {
            handleReset()
            setIsModalOpen(false)
        }
    }, [success])

    // to clear out city and college field if the state is changed
    useEffect(() => {
        setCity(null)
        setCollege(null)
    }, [state])

    // to clear out college field if the city is changed
    useEffect(() => {
        setCollege(null)
    }, [city])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setIsModalOpen(true)
    }

    return (
        <>
            {loadingCollegeData ? (
                <Loader />
            ) : (
                <form onSubmit={handleOnSubmit} className="collegeForm">
                    <div className="collegeForm__input">
                        <SelectOrAdd
                            value={state}
                            setValue={setState}
                            optionsData={collegeData}
                            label={'State'}
                            isAdd={isAdd}
                        />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            className={
                                isAdd
                                    ? 'collegeForm__helperText hidden'
                                    : 'collegeForm__helperText'
                            }
                        >
                            Submit with state only to delete all it's cities and colleges.
                        </Typography>
                    </div>
                    <div className="collegeForm__input">
                        <SelectOrAdd
                            value={city}
                            setValue={setCity}
                            optionsData={state && state.cities ? state.cities : []}
                            label={'City'}
                            isAdd={isAdd}
                        />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            className={
                                isAdd
                                    ? 'collegeForm__helperText hidden'
                                    : 'collegeForm__helperText'
                            }
                        >
                            Submit with city only to delete all it's colleges.
                        </Typography>
                    </div>

                    <div className="collegeForm__input">
                        <SelectOrAdd
                            value={college}
                            setValue={setCollege}
                            optionsData={
                                state && city && city.colleges ? city.colleges : []
                            }
                            label={'College'}
                            isAdd={isAdd}
                        />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            className={
                                isAdd
                                    ? 'collegeForm__helperText hidden'
                                    : 'collegeForm__helperText'
                            }
                        >
                            Submit a college to delete.
                        </Typography>
                    </div>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        className="collegeForm__button"
                    >
                        Submit
                    </Button>
                </form>
            )}

            <ConfirmModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                handleOnConfirm={() =>
                    handleDispatch(
                        {
                            state: state ? (state._id ? state._id : state.name) : null,
                            city: city ? (city._id ? city._id : city.name) : null,
                            college: college
                                ? college._id
                                    ? college._id
                                    : college.name
                                : null,
                        },
                        password
                    )
                }
                password={password}
                setPassword={setPassword}
                loading={loading}
            />
        </>
    )
}

export default CollegeForm
