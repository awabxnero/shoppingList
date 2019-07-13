const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const items = require("./routes/api/items.js");

//initialize express
const app = express();

//body parser middleware to access the bodies if requests
app.use(bodyParser.json());

//configure Database
const db = require("./config/keys.js").mongoURI;

//connnect to database mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("connected to database MongoDB"))
  .catch(err => console.log(err));

//use routes
app.use("/api/items", items);

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
//process.en.PORT is the port number of the deplyment enviroment

//configure app to listen to a port
app.listen(port, () => console.log(`server is up and running on port${port}`));
