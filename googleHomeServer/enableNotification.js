var GoogleHomeNotifier = require('./googleHomeNotifier');

function EnableNotification() {
    this.handleNotification = function(message) {
        var googleHM = new GoogleHomeNotifier();
        googleHM.notify(message, function(notifyRes) {
          console.log(notifyRes);
        });
    }
}

module.exports = EnableNotification;
