// Imports
const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoString = require("./mongoString");

// Setup Express App & Port
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const dbURI = mongoString;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    console.log("Connected to the database");
    app.listen(PORT || 4000, () => {
      console.log("Server is now running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Retrieve Static Files
app.use(express.static("public"));

// Invoke Body-Parser (Parses the body of a request and attaches it to the req object)
app.use(bodyParser.json());

// Initialize Routes
app.use("/api", routes);
