var EnableNotification = require('./enableNotification');
var UnableNotification = require('./unableNotification');

function GoogleHome() {
    this.notificationStrategy = new EnableNotification();

    this.setStrategy = function (notificationStrategy) {
        this.notificationStrategy = notificationStrategy;
        console.log(notificationStrategy);
    }

    this.handleNotification = function (message) {
        this.notificationStrategy.handleNotification(message);
    }
}

module.exports = function () {
    return new GoogleHome();
}
