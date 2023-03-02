// index.js
// where your node app starts

// init project
const express = require("express");
const status = require("http-status");
const isValidDate = require("./helpers/isValidDate");

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
  const { date } = req.params;

  if (!date) {
    const current = new Date();

    return res.status(status.OK).json({
      unix: current.getTime(),
      utc: current.toUTCString()
    });
  }

  const dateToSend = new Date(
    /^[0-9]+$/.test(date) ? Number.parseInt(Number.parseInt(date)) : date
  );

  if (!isValidDate(dateToSend)) {
    return res.status(status.BAD_REQUEST).json({
      error: "Invalid Date"
    })
  }

  return res.status(status.OK).json({
    unix: dateToSend.getTime(),
    utc: dateToSend.toUTCString()
  })
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
