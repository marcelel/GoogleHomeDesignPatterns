var express = require('express');
var serverError = require('./serverError');
var requestHandler = require('./RequestHandler');
var bodyParser = require('body-parser');
var app = express();

const serverPort = 8082;

app.use(bodyParser.json());

app.post('/message', function(req, res) {
    var response = requestHandler.handle(req, res);
    console.log('response server ' + response);
})

app.listen(process.env.PORT || serverPort, function() {
    console.log('server start');
})
