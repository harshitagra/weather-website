const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname ,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harshit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harshit'
    })
})
app.get('/help', (req, res) => {
    res.render('help' , {
        title: 'Help Me',
        name: 'Harshit' 
    })
}) 
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide the address.'
        })
    }
    forecast(req.query.address, (error,forecastData) => { 
        if(error) {
            return res.send({error})
        }
        res.send({
            forecast: forecastData.forecast,
            location: forecastData.name + ',' + forecastData.region + ',' + forecastData.country
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title: '404',
        msg: 'Help page note found',
        name: 'Harshit'
    })
})
app.get('*', (req,res) => {
    res.render('error',{
        title: '404',
        msg: '404 page not found',
        name: 'Harshit'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})