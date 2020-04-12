var request = require('superagent');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-wolfhaus", "Wolfhaus", WolfhausAccessory);
}

class WolfhausAccessory {
    constructor(log, config) {
        this.log = log;
        this.log('Adding WolfhausAccessory');
        this.name = config.name;
        this.url = config.url;

        this.wolfhausTemperatureService = new Service.TemperatureSensor(this.name);
        this.wolfhausTemperatureService
            .getCharacteristic(Characteristic.CurrentTemperature)
            .on('get', this.getCurrentTemperature);
    }

    getServices = () => {
        return [this.wolfhausTemperatureService];
    }

    getCurrentTemperature = (callback) => {
        request.get(this.url)
            .then(result => callback(null, result.body.temperature));
    }
}
