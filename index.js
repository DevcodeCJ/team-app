// Imports
const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoString = require("./mongoString");
// const cors = require("cors");

// Setup Express App & Port
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const dbURI = mongoString;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log("Server is listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Invoke Body-Parser (Parses the body of a request and attaches it to the req object)
app.use(bodyParser.json());

// Supports encoded bodies
app.use(express.urlencoded({ extended: true }));

// Initialize Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api", routes);

// Register View Engine
app.set("view engine", "ejs");
// app.set("view options", {
//   layout: false,
// });

// Retrieve Static Files
app.use(express.static("public"));

// app.use(cors({ origin: new URL("http://localhost:4000"), credentials: true })); // Add this 'new' keyword to URL

//Setting Response Headers
// app.use((req, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });
