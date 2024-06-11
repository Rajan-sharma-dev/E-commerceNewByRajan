const express = require("express");
const { isAuthenticatedUser } = require("../Middleware/auth");
const { newOrder } = require("../controller/orderConTroller");
const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser, newOrder)


module.exports = router