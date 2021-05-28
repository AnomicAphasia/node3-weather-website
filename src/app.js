const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Global variables
const publicStaticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Defining app
const app = express();
const port = process.env.PORT || 3000;

// Setting up Dynamic Templates (handlebars)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setting express to use static path
app.use(express.static(publicStaticPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Travis Briscoe',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Travis Briscoe',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the help page',
    title: 'Help',
    name: 'Travis Briscoe',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({
      status: 'Failed',
      error: 'No address provided. Please try again and provide an address.',
    });
  }
  // let address = req.query.address;
  geoCode(req.query.address, (error, { lng, lat, location } = {}) => {
    if (error) {
      return res.status(400).send({
        status: 'fail',
        error,
      });
    }
    forecast(lng, lat, (error, data) => {
      if (error) {
        return res.status(500).send({
          error,
        });
      }
      return res.status(200).send({
        status: 'success',
        location,
        lat,
        lng,
        data,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.status(400).send({
      status: 'failed',
      message: 'Need search query',
    });
  }
  res.status(200).send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.status(404).render('error', {
    name: 'Travis Briscoe',
    errorMessage: `404 - Sorry! Can't find that article`,
  });
});

app.get('*', (req, res) => {
  res.status(404).render('error', {
    name: 'Travis Briscoe',
    errorMessage: '404 - Page not found!',
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
