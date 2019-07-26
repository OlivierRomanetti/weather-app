const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Olivier Romanetti',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Olivier Romanetti',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help section',
    name: 'Olivier Romanetti',
    helpText: 'Some helpfull text for user',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          address: req.query.address,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: '404: Help article not found!',
    name: 'Olivier Romanetti',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: '404: Page not found!',
    name: 'Olivier Romanetti',
  });
});

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
