var Client                = require('castv2-client').Client;
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
var mdns                  = require('mdns');
var browser = mdns.createBrowser(mdns.tcp('googlecast'));
var googleTTS = require('google-tts-api');

const GHIP = '192.168.43.86'; //google home ip
const LANGUAGE = 'PL'; //accent of reading notification

function GoogleHomeNotifier() {
    this.ip = GHIP;

    this.notify = function(message, callback) {
        getSpeechUrl(message, function(url){
            console.log(url);
            onDeviceUp(ip, url, function(res){
                callback(res);
            })
        })
    }

    var getSpeechUrl = function(message, callback) {
        //google text to speech api
        googleTTS(message, LANGUAGE, 1)
            .then(function (url) {
                callback(url);
            })
            .catch(function (err) {
                console.error(err.stack);
            });
    }

    var onDeviceUp = function(host, url, callback) {
        var client = new Client();
        //open conection to google home
        client.connect(host, function() {
            client.launch(DefaultMediaReceiver, function(err, player) {
                var media = {
                    contentId: url,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED',
                }
                // streaming to google home
                player.load(media, { autoplay: true }, function(err, status) {
                    client.close();
                    callback('Device notified');
                });
            });
        });

        client.on('error', function(err) {
        console.log('Error: %s', err.message);
        client.close();
        callback(err);
        });
    }
}


module.exports = GoogleHomeNotifier;
