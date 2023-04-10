const dotenv = require("dotenv").config();
const connectDatabase = require("./config/database");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to unhandled uncaught Exception");
  process.exit(1);
});

//  config
// dotenv.config({ path: "backend/config/config.env" });
const app = require("./app");

connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
// unhandeled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
