const asyncHandler = require('express-async-handler')

// to register new user
const userRegister = asyncHandler(async (req, res) => {})

// to login existing user
const userLogin = asyncHandler(async (req, res) => {})

// to delete existing user
const userDelete = asyncHandler(async (req,res) => {})

// to update details of existing user
const userUpdate = asyncHandler(async (req,res) => {})

module.exports = {userRegister, userLogin, userDelete, userUpdate}
