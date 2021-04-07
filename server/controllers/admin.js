const asyncHandler = require('express-async-handler')

// to register a new admin
const adminRegister = asyncHandler(async (req, res) => {})

// to login an existing admin
const adminLogin = asyncHandler(async (req, res) => {})

// to delete an admin
const adminDelete = asyncHandler(async (req, res) => {})

// to add a new state
const adminStateAdd = asyncHandler(async (req, res) => {})

// to add a new city
const adminCityAdd = asyncHandler(async (req, res) => {})

// to add a new college
const adminCollegeAdd = asyncHandler (async (req, res) => {})

module.exports = {adminRegister, adminLogin, adminDelete, adminStateAdd, adminCityAdd, adminCollegeAdd}