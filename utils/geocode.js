const request = require('request');

const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapbox_token = 'pk.eyJ1IjoiaXNsYW1haG1lZDkzIiwiYSI6ImNrNXRjMnkwaTA0eHIzbm8wZ294a2h6N3IifQ.ShArEaSESkz-2fXyIGt87w';
const mapbox_params = '?access_token='+mapbox_token+'&limit=1';

const geocode = (search, callback) => {
    let searchEncoded = encodeURIComponent(search);
    let url = mapbox_url +searchEncoded+'.json'+mapbox_params;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service.', undefined);
        } else if (body.features.length == 0){
            callback('Location not found. Please try another location.', undefined);
        } else {
            debugger
            callback(undefined, {lng: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            });
            
        }
        
    });
}

module.exports = geocode;