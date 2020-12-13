const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const usersRouter = require("./routes/users");
const roomRouter = require("./routes/room");
const contractRouter = require("./routes/contract");
const receiptRouter = require("./routes/receipt");
const expenseRouter = require("./routes/expense");
const messageRouter = require("./routes/message");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI_LOCAL;
mongoose.connect(uri, {
  userNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
 
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./middlewares/passport")(passport);

app.use("/api/users", usersRouter);
app.use("/api/room", roomRouter);
app.use("/api/contract", contractRouter);
app.use("/api/receipt", receiptRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/message", messageRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
