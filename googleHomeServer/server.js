var express = require('express');
var serverError = require('./serverError');
var googleHome = require('./googleHome')();
var random = require('./infinity')();
var ngrok = require('ngrok');
var EnableNotification = require('./enableNotification');
var UnableNotification = require('./unableNotification');
var bodyParser = require('body-parser');
var app = express();

const serverPort = 8082;

app.use(bodyParser.json());

app.get('/infinity/on', function(req,res){
    console.log('inifinity on');
    var text = '{"msg" : "Infinity on"}';
    res.status(200).send(JSON.parse(text));
    var id = setInterval(function() { random.turnOn(); },30000);
})

app.get('/notifications/on',  function (req, res) {
    console.log('request on /notifications/on');
    var text = '{ "msg" : "Notififications switched on" }';
    res.status(200).send(JSON.parse(text));
    googleHome.setStrategy(new EnableNotification());
})

app.get('/notifications/off', function (req, res) {
    console.log('request on /notifications/off');
    var text = '{ "msg" : "Notififications switched off" }';
    res.status(200).send(JSON.parse(text));
    googleHome.setStrategy(new UnableNotification());
})

app.post('/readmessage', function (req, res) {
    var result = serverError.isProperRequest(req);
    if (result.isProper) {
        console.log(req.body.msg);
        googleHome.handleNotification(req.body.msg);
        return res.sendStatus(200);
    } else {
        console.log('Wrong request');
        return res.status(result.serverError.getErrorCode()).send(result.serverError.getErrorMessage());
    }
})

app.listen(serverPort, function() {
    //starting ngrok server, endpoint will be log in console
    ngrok.connect({proto: 'http',addr:serverPort}, function (err, url) {
      console.log('Endpoints:' + url);
    });
})
