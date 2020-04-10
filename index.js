var request = require('superagent');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-weather", "Weather", WeatherAccessory);

}

function WeatherAccessory(log, config) {
    this.log = log;
    this.log('Adding WeatherAccessory');
    this.name = config.name;
    this.url = config.url;
    
    this.weatherService = new Service.TemperatureSensor(this.name);
    this.weatherService
        .getCharacteristic(Characteristic.CurrentTemperature)
        .on('get', this.getTemperature.bind(this));
}

WeatherAccessory.prototype.getTemperature = function (callback) {
    this.log('Getting temperature');
    request.get(this.url)
        .then(result => {
            this.log('Current: ' + result.body.temperature);
            callback(null, result.body.temperature);
        });
}

WeatherAccessory.prototype.getServices = function() {
    return [this.weatherService];
}
