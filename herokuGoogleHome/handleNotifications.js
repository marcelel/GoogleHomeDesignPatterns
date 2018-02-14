const HandleHttp = require('./handleHttp');
const url = 'http://8a6a0e97.ngrok.io/';

function HandleNotifications() {
  this.enableNotifications = function(callback) {
    var response = new HandleHttp();
    response.getMethod(url +'notifications/on', function(res) {
       callback(res);
    });
  }
  this.disableNotifications = function(callback) {
    var response = new HandleHttp();
    response.getMethod(url +'notifications/off', function(res) {
       callback(res);
    });
  }

  this.runInfinity = function(callback) {
      var response = new HandleHttp();
      response.getMethod(url + 'infinity/on', function(res){
        callback(res);
      });
  }
}
// var h = new HandleNotifications();
// var text = h.disableNotifications(function(res){
//     console.log('Enabled' + res);
// });

module.exports = HandleNotifications;
