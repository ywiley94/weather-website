const request = require('request')

const forecast = (long, lati, callback) => {
    const url = "https://api.darksky.net/forecast/fec769c1f4efe1c70400649869793b92/" + long + "," + lati + "?"

    request({ url, json: true }, (error, {body}) => {
        const currently = body.currently
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error, undefined) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + currently.temperature + ' degress out. ' + 'There is ' + currently.precipProbability + '% chance of rain')
        }

        
    })
}

module.exports = forecast