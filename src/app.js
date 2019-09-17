const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3306

//Define paths for Express Congif
const DirectoryPath = path.join(__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and view setup
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(DirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Qasim'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (!req.query.address) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search is not provided'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Qasim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        HelpTxt: 'Helpful text for website',
        name: 'Qasim',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Qasim',
        errorMessage: 'Help Page is not available'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Qasim Naeem',
        errorMessage: 'Page is Not Found'
    })
})


app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})