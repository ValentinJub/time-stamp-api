// index.js
// where your node app starts

// init project
//require .env -> you have to add its dependency in the package.json
//then use npm install to install the package
//and finally require it here.
require('dotenv').config();
//same for express, has to be required in dependency
//here we declare it and assign it to app
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const unixRegex = /^[0-9]+$/;
  let dateEntered = req.params.date;
  let dateGMT, dateUNIX;
  //if no params provided
  if(dateEntered === undefined) {
    //fetch date now
    dateGMT = Date();
    dateGMT = new Date(dateGMT).toUTCString();
    //translate to unix
    dateUNIX = Date.parse(dateGMT);
    res.json({unix: dateUNIX, utc: dateGMT})
  }
  else {
    if(unixRegex.test(dateEntered)) {
       //fetch date now
       dateGMT = new Date(parseInt(dateEntered)).toUTCString();
       //translate to unix
       dateUNIX = Date.parse(dateGMT);
       res.json({unix: dateUNIX, utc: dateGMT})
    }
    else if(new Date(dateEntered) == "Invalid Date") {
      res.json({error: "Invalid Date"});
    }
    else {
      //fetch date now
      dateGMT = new Date(dateEntered).toUTCString();
      //translate to unix
      dateUNIX = Date.parse(dateGMT);
      res.json({unix: dateUNIX, utc: dateGMT})
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
