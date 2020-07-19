const request = require('request')

const forecast = function(location,callback) {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=643be5b158814459a7d94530201907&q='+location+'&days=1'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather forecast',undefined)
        }    
        else if(body.error) {
            callback('Cannot find the given location. Please try something else!')
        }
        else {
            callback(undefined,{
                forecast: body.current.temp_c + ' is the current temperature in celsius. '+body.current.condition.text,
                name: body.location.name,
                region: body.location.region,
                country: body.location.country
            })
        }
    })
    
}
module.exports = forecast