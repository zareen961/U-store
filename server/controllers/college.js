const asyncHandler = require('express-async-handler')
const { ObjectID } = require('mongodb')

const State = require('../models/State')
const City = require('../models/City')
const College = require('../models/College')
const Admin = require('../models/Admin')

// to add a new state
const collegeAdd = asyncHandler(async (req, res) => {
    const { state, city, college, password } = req.body

    // checking if all the fields are passed or not
    if (!(state && city && college)) {
        res.status(400)
        throw new Error('Provide all three fields!')
    }

    let newState = null,
        newCity = null

    // finding the logged in admin
    const foundAdmin = await Admin.findById(req.authAdmin._id)

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
        // if a new state is passed then create it **************************************
        if (!ObjectID.isValid(state)) {
            newState = await State.create({
                name: state.trim(),
                cities: [],
            })

            if (!newState) {
                res.status(500)
                throw new Error('Error occurred while creating a new State!')
            }
        }

        // if a new city is passed then create it *****************************************
        if (!ObjectID.isValid(city)) {
            newCity = await City.create({
                name: city.trim(),
                colleges: [],
            })

            if (!newCity) {
                res.status(500)
                throw new Error('Error occurred while creating a new City!')
            }

            // finding and updating the state in which the new city is created
            const foundState = await State.findById(newState ? newState._id : state)

            if (!foundState) {
                res.status(500)
                throw new Error('Cannot find the State in which the new City is created!')
            }

            foundState.cities.push(newCity._id)
            foundState.save()
        }

        // Adding a new college ******************************************************
        if (ObjectID.isValid(college)) {
            res.status(400)
            throw new Error('This college is already added!')
        } else {
            const newCollege = await College.create({
                name: college.trim(),
            })

            if (!newCollege) {
                res.status(500)
                throw new Error('Error occurred while adding the college!')
            }

            // finding and updating the city in which the new college is created
            const foundCity = await City.findById(newCity ? newCity._id : city)

            if (!foundCity) {
                res.status(500)
                throw new Error(
                    'Cannot find the City in which the new College is created!'
                )
            }

            foundCity.colleges.push(newCollege._id)
            foundCity.save()
        }

        res.status(200).send({
            message: 'College Data Added!',
        })
    } else {
        res.status(401)
        throw new Error('Your credentials might be wrong! Try again.')
    }
})

// to add a new city
const collegeGetAll = asyncHandler(async (req, res) => {
    const foundStates = await State.find({})
        .sort({ name: 'asc' })
        .populate({
            path: 'cities',
            options: { sort: { name: 'asc' } },
            populate: {
                path: 'colleges',
                options: { sort: { name: 'asc' } },
            },
        })

    if (foundStates) {
        res.status(200).json(foundStates)
    } else {
        res.status(400)
        throw new Error('Error occurred while fetching the college data!')
    }
})

// to add a new college
const collegeDelete = asyncHandler(async (req, res) => {
    const { password, state, city, college } = req.body

    // finding the logged in admin
    const foundAdmin = await Admin.findById(req.authAdmin._id)

    if (foundAdmin && password && (await foundAdmin.matchPassword(password))) {
        //if college is passed we delete that specific college
        if (state && city && college) {
            const foundCollege = await College.findById(college)

            if (foundCollege) {
                await foundCollege.remove()

                // now removing the collegeID from it's City
                await City.updateOne({ _id: city }, { $pull: { colleges: college } })

                return res.status(200).json({
                    message: 'College Deleted!',
                })
            } else {
                res.status(404)
                throw new Error('No College found!')
            }
        }

        //if city is passed we delete that specific city and all it's colleges
        if (state && city) {
            const foundCity = await City.findById(city)

            if (foundCity) {
                // deleting all the colleges of that city
                await College.deleteMany({ _id: { $in: foundCity.colleges } })

                await foundCity.remove()

                // now removing the cityID from it's State
                await State.updateOne({ _id: state }, { $pull: { cities: city } })

                return res.status(200).json({
                    message: 'City Deleted!',
                })
            } else {
                res.status(404)
                throw new Error('No City found!')
            }
        }

        //if only state is passed we delete that specific state and all it's cities and colleges
        if (state) {
            const foundState = await State.findById(state).populate('cities')

            if (foundState) {
                // building the arrays of IDs to be deleted together
                const cityIDsToDelete = [],
                    collegeIDsToDelete = []
                foundState.cities.forEach((city) => {
                    cityIDsToDelete.push(city._id)
                    collegeIDsToDelete.push(...city.colleges)
                })

                // deleting all the colleges of the state
                await College.deleteMany({ _id: { $in: collegeIDsToDelete } })

                // deleting all the cities of that state
                await City.deleteMany({ _id: { $in: cityIDsToDelete } })

                await foundState.remove()
                return res.status(200).json({
                    message: 'State Deleted!',
                })
            } else {
                res.status(404)
                throw new Error('No State found!')
            }
        }

        res.status(401)
        throw new Error('At least provide some data to perform delete operation!')
    } else {
        res.status(401)
        throw new Error('Your credentials might be wrong! Try again.')
    }
})

module.exports = { collegeAdd, collegeGetAll, collegeDelete }
