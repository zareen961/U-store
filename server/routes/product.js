const express = require("express")

const { protectUser } = require("../middleware/protect")
const {
    productUpload,
    productGetAll,
    productDelete,
    productUpdate,
} = require("../controllers/product")

const router = express.Router()

// @route: POST /api/product
// @desc: To upload a new product
// @access: Private
router.post("/", protectUser, productUpload)

// @route: GET /api/product
// @desc: To get all products for the logged in user’s college
// @access: Private
router.get("/", protectUser, productGetAll)

// @route: DELETE /api/product/:productID
// @desc: To delete a product
// @access: Private
router.delete("/:productID", protectUser, productDelete)

// @route: PUT /api/product/:productID
// @desc: To update one’s product until no bid is placed
// @access: Private
router.put("/:productID", protectUser, productUpdate)
