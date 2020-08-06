const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// Installation nodemon
// DB
const database = require("./config/database");
const mongoose = require('mongoose');
const path = require('path'); // NodeJS Package for file paths

mongoose.connect(database.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } ,(err) => {
    if (!err)
      console.log('MongoDB is connected in ' + database.db);
    else
      console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

// Afficher une page quand on saisi un url invalide
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/app/app.component.html'));
});

app.listen(port, function() {
  console.log("Running the server on port " + port);
});