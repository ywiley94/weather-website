const request = require('request')
const timeConversion = (millisec) => {
    let seconds = (millisec / 1000).toFixed(1);

    let minutes = (millisec / (1000 * 60)).toFixed(1);

    let hours = (millisec / (1000 * 60 * 60)).toFixed(1);

    let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        return seconds + " Sec";
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days"
    }
}

const forecast = (long, lati, callback) => {
    const url = "https://api.darksky.net/forecast/fec769c1f4efe1c70400649869793b92/" + long + "," + lati + "?"

    request({ url, json: true }, (error, {body}) => {
        const currently = body.currently
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error, undefined) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + currently.temperature + ' degress out. ' + 'There is ' + currently.precipProbability + '% chance of rain. ' + 'Tempature High will be ' + body.daily.data[0].temperatureHigh + ' degrees' + ' and tempature low will be ' + body.daily.data[0].temperatureLow + ' degrees')
        }

        
    })
}

module.exports = forecast