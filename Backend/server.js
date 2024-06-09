const app = require("./App")
const env = require("dotenv")

const connectDatabase = require("./config/databse")

env.config({path: "Backend/config/config.env"})

connectDatabase()
app.listen(process.env.PORT, () => {
    console.log("server is working")
})