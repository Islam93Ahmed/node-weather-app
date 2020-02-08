const URL = '/weather?address=';
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#errorMessage');
const forecastMessage = document.querySelector('#forecastMessage');
const locationMessage = document.querySelector('#locationMessage');

const getForecast = (location, callback) => {
    fetch(URL+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                callback(undefined, data.error);
            } else {
                callback(data, undefined);
            }
        })
    })
}


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessage.textContent = 'loading...';
    forecastMessage.textContent = '';
    locationMessage.textContent = '';
    getForecast(search.value, ({forecast, location}={}, error)=>{
        if(error){
            errorMessage.textContent = error;
        }else{
            errorMessage.textContent = '';
            forecastMessage.textContent = forecast;
            locationMessage.textContent = location;
        }
    });
});