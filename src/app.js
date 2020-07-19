const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir=path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Fuksas'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'Fuksas',
        title: 'About'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        message: 'this is an example',
        title: 'Help',
        name: 'Fuksas'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Need to provide an adress"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        else{
            forecast(longitude, latitude, (error, forecastData) =>{
                if(error){
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
}})})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    req.qyery
    res.render('404Page',{
        msg: 'Help article not found',
        name: 'Fuksas',
        title: '404'
    })
})

app.get('*',(req, res) =>{
    res.render('404Page',{
        msg: 'Page not found.',
       
    } )
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})