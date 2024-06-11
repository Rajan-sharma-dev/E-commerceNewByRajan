const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const errMiddleWare = require("./Middleware/error")
app.use(express.json())
app.use(cookieParser())

//route imported 
const products = require("./routes/productRoutes")
const users = require("./routes/userRoutees")
const orders = require("./routes/orderRoutes")
app.use("/api/v1", products)
app.use("/api/v1", users)
app.use("/api/v1", orders)
app.use(errMiddleWare);
module.exports = app;
