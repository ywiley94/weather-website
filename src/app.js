const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Yannick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yannick Wiley'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the Help Page!',
        message: 'This is a message to help you',
        name: 'Yannick Wiley'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You need to provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} ={}) => {
        if (error) {
            res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
               return res.send({
                    error: error
                })
            }
            res.send({
                forecastData: forecastData,
                location: location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            messege: 'Must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Error',
        message: 'Help article could not be found',
        name: 'Yannick Wiley'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Page could not be found',
        name: 'Yannick Wiley'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})