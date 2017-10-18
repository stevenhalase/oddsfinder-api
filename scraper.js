const rp = require('request-promise');
const cheerio = require('cheerio');
const Match = require('./models/MatchModel');

class OddsFinderScraper {
  constructor() {

  }

  scrapeBetway() {
    return new Promise((resolve, reject) => {
      var options = {
          uri: 'https://www.betway.co.ke/',
          transform: function (body) {
              return cheerio.load(body);
          }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            let elData = $(val).data();
            let prices = $(val).find('.outcome-pricedecimal');
            let psuedoKey = (elData.eventtitle.split(' v ')[0].split(' ').join('') + elData.eventtitle.split(' v ')[1].split(' ').join('') + new Date(elData.eventdate).getTime()).toLowerCase();
            Match.findOne({'PsuedoKey': psuedoKey, 'Service': 'https://www.betway.co.ke/'}, (err, existing) => {
              if (existing === null) {
                new Match({
                  Date: new Date(elData.eventdate).toISOString(),
                  PsuedoKey: psuedoKey,
                  Service: 'https://www.betway.co.ke/',
                  Sport: elData.sporttitle,
                  Team1: {
                    Name: elData.eventtitle.split(' v ')[0],
                    Price: $($(val).find('.outcome-pricedecimal')[0]).text().trim()
                  },
                  Team2: {
                    Name: elData.eventtitle.split(' v ')[1],
                    Price: $($(val).find('.outcome-pricedecimal')[2]).text().trim()
                  },
                  DrawPrice: $($(val).find('.outcome-pricedecimal')[1]).text().trim()
                }).save((err, newMatch) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  matches.push(newMatch);
                });
              }
            });
          })
          resolve();
        })
        .catch(err => {
            reject('Scraping failed.');
        });
    })
  }
}

module.exports = OddsFinderScraper;