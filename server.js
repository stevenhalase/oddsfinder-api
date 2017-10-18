const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3080;

const OddsFinderScraper = require('./scraper.js');

const uristring =
  process.env.MONGODB_URI ||
  'mongodb://localhost/oddsfinder';

mongoose.connect(uristring, (error) => {
  if (error) {
      console.error(error);
  } else {
      console.log('Mongoose connected successfully')
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("Origin"));
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

let matchRoutes = require('./routes/MatchRoutes');
app.use('/api/matches', matchRoutes);

app.get('/admin/startBetway', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetway()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

app.listen(port, () => {
    console.log('Server started at localhost:' + port);
})

