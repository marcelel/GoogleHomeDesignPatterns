var googleHome = require('./googleHome')();

function Random () {

    this.turnOn = function() {
        console.log('liczba');
        var num = Math.floor((Math.random() * 100) + 1) ;
        if (num > 50){
            text = num + '';
            googleHome.handleNotification(text);
        }
    };
}




module.exports = function () {
    return new Random();
}
