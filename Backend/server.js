const app = require("./App")
const env = require("dotenv")

const connectDatabase = require("./config/databse")

env.config({path: "Backend/config/config.env"})
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

connectDatabase()
app.listen(process.env.PORT, () => {
    console.log("server is working")
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });