const HandleHttp = require('./handleHttp');
const url = 'http://762eec28.ngrok.io/';

function HandleLights() {
  this.getLightsState = function(callback) {
    var response = new HandleHttp();
    response.getMethod(url, function(res) {
      callback(res);
    });
  }
}
module.exports = HandleLights;
