const request = require('request');

const darksky_url = 'https://api.darksky.net/forecast/0d77ea7686801267e764896160eabd42/';

const forecast =  (lng, lat, callback) => {
    let url = darksky_url+lng+','+lat+'?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to weather service.', undefined);
        }else if (body.error){
            callback("unable to find location.", undefined);
        }
        else{
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");    
        }
    });    
}

module.exports = forecast;