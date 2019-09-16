const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/5af2d0fcd73db8433873e0cf40f3a967/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) =>{
    if(error){
        callback('Unable to connect to weather service', undefined)
    }else if(body.error){
        callback('Unable to find loacation', undefined)
    }else{
        callback(undefined, `${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain ` )
    }
})
}
module.exports = forecast