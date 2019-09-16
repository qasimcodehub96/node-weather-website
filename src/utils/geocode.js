const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicW5hZWVtOTYiLCJhIjoiY2swOW1lcGVhMGE3ZDNjcHE3eXNja2Y2ZCJ9.dhhvdiuCD-zWieqTelX4jA`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find service, Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode