const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieparser());
// route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);

// error for middleware
app.use(errorMiddleware);
module.exports = app;
