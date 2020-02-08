const express = require('express');
const path = require('path');
const hbs = require('hbs'); 

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const port = process.env.PORT || 3000;

const app = express();

// Paths for the static files and templates directories
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set the template engine and views directory for Express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set the directory for the static files directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    // res.send("<h1>Weather</h1>");
    res.render('index', {
        title:'Weather App',
        name:'Islam Ahmed'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        message:'Help Me Please Help SOS',
        name:'Islam Ahmed'
    });
});

app.get('/about', (req, res)=>{
    // res.send('<h1>About</h1>')
    res.render('about',{
        title:'About',
        name:'Islam Ahmed'
    })
});

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Please Provide An Address.'
        });
    }
    geocode(req.query.address,(error, {lng, lat, location}={}) => {
        if(error){
            return res.send({
                error: error
            });
        }
        forecast(lng, lat, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                });
            }
            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
    
});

app.get('/help/*', (req, res)=>{
    //res.send('Help Article Not Found');
    res.render('error', {
        title: '404 Error',
        errorMsg: 'Help Article Not Found',
        name: 'Islam Ahmed'
    });
});

app.get('*', (req, res)=>{
    // res.send('<h1>404 page</h1>')
    res.render('error', {
        title: '404 Error',
        errorMsg: 'Page Not Found',
        name: 'Islam Ahmed'
    });
});


app.listen(port, ()=>{
    console.log('Server is running on port', port);
    // console.log('__dirname =>', __dirname);
    // console.log('__filename =>', __filename);
});