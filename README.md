# homebridge-wolfhaus-humidity

An extremely simple plugin for Homebridge to pull the current humidity from an HTTP endpoint and display it in Home on iOS.

Example Homebridge `config.json` accessory configuration:

```
"accessories": [
    {
        "accessory": "WolfhausHumidity",
        "name": "Outdoor Humidity",
        "url": "http://pi:3000/rest/outdoor"
    },
    {
        "accessory": "WolfhausHumidity",
        "name": "Indoor Humidity",
        "url": "http://fourbee:3000/rest/indoor"
    }
],
```
