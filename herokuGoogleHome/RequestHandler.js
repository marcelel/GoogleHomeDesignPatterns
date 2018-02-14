var inherits = require('util').inherits;
var HandleLights = require('./handleLights');
var HandleNotifications = require('./handleNotifications');

function RequestHandler () {
    this.successor = null;
}

RequestHandler.prototype.setSuccessor = function(successor) {
    this.successor = successor;
}

RequestHandler.prototype.handle = function(req, res) {
    return this.successor.handle(req, res);
}

function Chain1() {
    RequestHandler.call(this);
}
inherits(Chain1, RequestHandler);

Chain1.prototype.handle = function(req, res) {
    if (req.body.result.action == 'randomize_number_now') {
        var text = 'Alright, your number is ' + Math.floor((Math.random() * 100) + 1);
        res.setHeader('Content-Type','application/json');
        console.log('request handler resposne' + text);
        res.status(200).send(JSON.stringify({
            speech: text,
            displayText: text
        }));
    } else {
      this.successor.handle(req, res);
    }
}

function Chain2() {
    RequestHandler.call(this);
}
inherits(Chain2, RequestHandler);

Chain2.prototype.handle = function(req, res) {
    if (req.body.result.action == 'lights_report') {
        var handleLights = new HandleLights();
        handleLights.getLightsState(function(text){
          res.setHeader('Content-Type','application/json');
          res.status(200).send(JSON.stringify({
              speech: text,
              displayText: text
          }));
        });
    }else {
      this.successor.handle(req, res);
    }
}

function Chain3() {
    RequestHandler.call(this);
}
inherits(Chain3, RequestHandler);

Chain3.prototype.handle = function(req, res) {
    console.log(req.body.result.action + '');
    if (req.body.result.action == 'turn_off_notifications') {
      console.log('turn off notifications');
      var handleNotification = new HandleNotifications();
      handleNotification.disableNotifications(function(text){
        res.setHeader('Content-Type','application/json');
        res.status(200).send(JSON.stringify({
            speech: text,
            displayText: text
        }));
        console.log('respons do turn off notifications' + res);
      });
    } else {
      this.successor.handle(req, res);
    }
}

function Chain4() {
    RequestHandler.call(this);
}
inherits(Chain4, RequestHandler);

Chain4.prototype.handle = function(req, res) {
    if (req.body.result.action == 'turn_on_notifications') {
      console.log('turn on notifications');
      var handleNotification = new HandleNotifications();
      handleNotification.enableNotifications(function(text){
        res.setHeader('Content-Type','application/json');
        res.status(200).send(JSON.stringify({
            speech: text,
            displayText: text
        }));
        console.log('respons do turn on notifications' + res);
      });
    } else {
      this.successor.handle(req, res);
    }
}

function Chain5() {
    RequestHandler.call(this);
}
inherits(Chain5, RequestHandler);

Chain5.prototype.handle = function(req, res) {
    if (req.body.result.action == 'infinity_rand_number') {
      console.log('infinity chain');
      var handleNotification = new HandleNotifications();
      handleNotification.runInfinity(function(text){
        res.setHeader('Content-Type','application/json');
        res.status(200).send(JSON.stringify({
            speech: text,
            displayText: text
        }));
        console.log('respons do turn on notifications' + res);
      });
    } else {
      this.successor.handle(req, res);
    }
}

function NoHandler() {
    RequestHandler.call(this);
}
inherits(NoHandler, RequestHandler);

NoHandler.prototype.handle = function(req, res) {
    return res.status(400).send('Bad Request');
}

function RequestHandlerStack() {
    var chain1 = new Chain1();
    var chain2 = new Chain2();
    var chain3 = new Chain3();
    var chain4 = new Chain4();
    var chain5 = new Chain5();
    var noHandler = new NoHandler();

    chain1.setSuccessor(chain2);
    chain2.setSuccessor(chain3);
    chain3.setSuccessor(chain4);
    chain4.setSuccessor(chain5);
    chain5.setSuccessor(noHandler);

    this.head = chain1;
}

var handle = function(req, res) {
    var requestHandlerStack = new RequestHandlerStack();
    return requestHandlerStack.head.handle(req, res);
}

module.exports.handle = handle;
