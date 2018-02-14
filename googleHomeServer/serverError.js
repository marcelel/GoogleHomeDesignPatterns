var inherits = require('util').inherits;

var result = {
    isProper: true,
    serverError: null
}

function ServerError () {
    this.successor = null;
    this.errorMessage = '';
    this.errorCode = 0;
}

ServerError.prototype.getErrorCode = function () {
    return this.errorCode;
}

ServerError.prototype.getErrorMessage = function () {
    return this.errorMessage;
}

ServerError.prototype.setSuccessor = function (successor) {
    this.successor = successor;
}

ServerError.prototype.handle = function (req) {
    return this.successor.handle(req);
}

function EmptyBody() {
    ServerError.call(this);
    this.errorMessage = 'Body can not be empty';
    this.errorCode = 400;
}
inherits(EmptyBody, ServerError);

EmptyBody.prototype.handle = function (req) {
    if (!req.body) {
        result.isProper = false;
        result.serverError = this;
        return result;
    } else {
        return this.successor.handle(req);
    }
}

function BadRequest() {
    ServerError.call(this);
    this.errorMessage = 'Request has to contain \'message\' key';
    this.errorCode = 400;
}
inherits(BadRequest, ServerError);

BadRequest.prototype.handle = function (req) {
    if (!req.body.msg) {
        result.isProper = false;
        result.serverError = this;
        return result;
    } else {
        return result;
    }
}

function ServerErrorStack() {
    var emptyBody = new EmptyBody();
    var badRequest = new BadRequest();

    emptyBody.setSuccessor(badRequest);

    this.head = emptyBody;
}

var isProperRequest = function(req) {
    var serverErrorStack = new ServerErrorStack();
    return serverErrorStack.head.handle(req);
}

module.exports.isProperRequest = isProperRequest;
module.exports.result = result;
