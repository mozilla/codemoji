'use strict';

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const notFoundHTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>404 - Page not found</title>
  </head>
  <body>
    <p>404 - Page not found</p>
  </body>
  </html>`;

let logger = 'dev';

if (process.env.NODE_ENV === 'production') {
  logger = 'combined';
}

app.disable('x-powered-by');

app.use(morgan(logger));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'none\''],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'data:',
      'www.google-analytics.com'
    ],
    fontSrc: [
      '\'self\''
    ],
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://www.google.com',
      'fonts.googleapis.com',
      'https://api.tiles.mapbox.com',
      'https://s.ytimg.com'
    ],
    imgSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'twemoji.maxcdn.com',
      'www.google-analytics.com'
    ],
    connectSrc: [
      '\'self\'',
      'https://bitly.mofoprod.net'
    ]
  },
  reportOnly: false,
  browserSniff: false
}));

app.use(helmet.xssFilter({
  setOnOldIE: true
}));

app.use(helmet.frameguard({
  action: 'deny'
}));

app.use(helmet.hsts({
  maxAge: 1000 * 60 * 60 * 24 * 90
}));

app.use(helmet.ieNoOpen());

app.use(helmet.noSniff());

if (process.env.HPKP) { 
  app.use(helmet.hpkp({
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sha256s: process.env.HPKP.split(' '),
    setIf: function (req, res) {
      return req.secure;
    }
  }));
}

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.status(404).send(notFoundHTML);
});

module.exports = app;
