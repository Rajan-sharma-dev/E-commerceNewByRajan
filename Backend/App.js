const express = require("express");
const app = express();
const errMiddleWare = require("./Middleware/error")
app.use(express.json())

//route imported 
const products = require("./routes/productRoutes")
app.use("/api/v1", products)
app.use(errMiddleWare);
module.exports = app;
