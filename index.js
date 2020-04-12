const request = require('superagent');
let Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-wolfhaus-humidity", "WolfhausHumidity", WolfhausHumidityAccessory);
}

class WolfhausHumidityAccessory {
    constructor(log, config) {
        this.log = log;
        this.log('Adding WolfhausHumidityAccessory');
        this.name = config.name;
        this.url = config.url;

        this.wolfhausHumidityService = new Service.HumiditySensor(this.name);
        this.wolfhausHumidityService
            .getCharacteristic(Characteristic.CurrentRelativeHumidity)
            .on('get', this.getCurrentHumidity);
    }

    getServices = () => {
        return [this.wolfhausHumidityService];
    }

    getCurrentHumidity = (callback) => {
        request.get(this.url)
            .then(result => callback(null, result.body.humidity));
    }
}
