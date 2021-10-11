// server.js
// where your node app starts

const express = require('express');
const rTracer = require('cls-rtracer');
const { ApiLoggerMiddleware, Logger } = require('./logger');
const cors = require('cors');
const upload = require('multer')({ dest: 'uploads/' });

require('dotenv').config();

// init project
var app = express();

// logging middleware
app.use(rTracer.expressMiddleware(), ApiLoggerMiddleware);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;

  res.json({ name: file.originalname, type: file.mimetype, size: file.size });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  Logger.info('Server', `Your app is listening on port ${listener.address().port}`);
});
