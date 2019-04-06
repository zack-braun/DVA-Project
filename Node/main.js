// main.js - start here
// get all the tools we need

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morganLogger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const initServer = require('./initServer')


// configuration ===============================================================
const port = process.env.PORT || 8081;

const http = require('http');

http.createServer(app).listen(port);

app.use(express.static(path.join(__dirname, '/dist'), { maxAge: '1y' }));
app.set('views', path.join(__dirname, '/dist'));
app.engine('html', require('ejs').renderFile);

// connect to db
mongoose.connect(config.DBurl);

// log every request to the console
app.use(morganLogger('dev'));

// get information from html forms (JSON only)
app.use(bodyParser.json());

// querystrings enabled
app.use(bodyParser.urlencoded({ extended: true }));

// routes ======================================================================
// load routes
require('./routes/routes.js')(app);
// launch ======================================================================
// server.listen(port);
initServer();
console.log(`The magic happens on port ${port}`);

