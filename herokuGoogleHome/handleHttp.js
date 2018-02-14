const http = require('http');
function HandleHttp() {

  this.getMethod = function(url, callback) {

    http.get(url, function(res) {

      const { statusCode } = res;
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return;
      }
      res.setEncoding('utf8');
       let rawData = '';
       res.on('data', (chunk) => { rawData += chunk; });
       res.on('end', () => {
         try {
           const parsedData = JSON.parse(rawData).msg;
           console.log('parsowanie http' + parsedData);
           callback(parsedData);
         } catch (e) {
           console.error(e.message);
         }
       });
      }).on('error', (e) => {
       console.error(`Got error: ${e.message}`);
     });
  }
}

module.exports = HandleHttp;
