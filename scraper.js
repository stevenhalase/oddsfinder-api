const rp = require('request-promise');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
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
            Match.findOne({'PsuedoKey': psuedoKey}, (err, existing) => {
              if (existing) {
                var matching = existing._doc.MatchInstances.find(el => {
                  return el.Service = 'https://www.betway.co.ke/';
                })
                if (typeof matching === 'undefined') {
                  existing._doc.MatchInstances.push({
                    Service: 'https://www.betway.co.ke/',
                    Team1: {
                      Name: elData.eventtitle.split(' v ')[0],
                      Price: $($(val).find('.outcome-pricedecimal')[0]).text().trim()
                    },
                    Team2: {
                      Name: elData.eventtitle.split(' v ')[1],
                      Price: $($(val).find('.outcome-pricedecimal')[2]).text().trim()
                    },
                    DrawPrice: $($(val).find('.outcome-pricedecimal')[1]).text().trim()
                  })
                  
                  existing.save((err, updatedMatch) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    matches.push(updatedMatch);
                  });
                }
              } else {
                new Match({
                  PsuedoKey: psuedoKey,
                  Sport: elData.sporttitle,
                  Date: new Date(elData.eventdate).toISOString(),
                  MatchInstances: [{
                    Service: 'https://www.betway.co.ke/',
                    Team1: {
                      Name: elData.eventtitle.split(' v ')[0],
                      Price: $($(val).find('.outcome-pricedecimal')[0]).text().trim()
                    },
                    Team2: {
                      Name: elData.eventtitle.split(' v ')[1],
                      Price: $($(val).find('.outcome-pricedecimal')[2]).text().trim()
                    },
                    DrawPrice: $($(val).find('.outcome-pricedecimal')[1]).text().trim()
                  }]
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
            reject(err);
        });
    })
  }

  scrapeBetwayPremierLeague() {
    return new Promise((resolve, reject) => {
      let cookie1 = new tough.Cookie({
          key: "ASP.NET_SessionId",
          value: "nzrzspfiq2zartrybn5jp11b",
          domain: 'www.betway.co.ke',
          httpOnly: true,
          maxAge: 3
      });

      var cookiejar = rp.jar();
      cookiejar.setCookie(cookie1, 'https://www.betway.co.ke/Event/FilterEvents');

      var options = {
        method: 'POST',
        uri: 'https://www.betway.co.ke/Event/FilterEvents',
        form: {
          couponTypeId: undefined,
          leagueIds: [
            "94c4842a-5fbb-4510-89db-347b98bd3d35"
          ],
          marketTypeCategoryId: "00000000-0000-0000-da7a-000000580001"
        },
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            matches.push(this.parseMatches($, val));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeBetwayEFLCup() {
    return new Promise((resolve, reject) => {
      let cookie1 = new tough.Cookie({
          key: "ASP.NET_SessionId",
          value: "nzrzspfiq2zartrybn5jp11b",
          domain: 'www.betway.co.ke',
          httpOnly: true,
          maxAge: 3
      });

      var cookiejar = rp.jar();
      cookiejar.setCookie(cookie1, 'https://www.betway.co.ke/Event/FilterEvents');

      var options = {
        method: 'POST',
        uri: 'https://www.betway.co.ke/Event/FilterEvents',
        form: {
          couponTypeId: undefined,
          leagueIds: [
            "8a2c7c20-79a8-49c4-b36a-3940cbb08fb7"
          ],
          marketTypeCategoryId: "00000000-0000-0000-da7a-000000580001"
        },
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            matches.push(this.parseMatches($, val));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeBetwayLaLiga() {
    return new Promise((resolve, reject) => {
      let cookie1 = new tough.Cookie({
          key: "ASP.NET_SessionId",
          value: "nzrzspfiq2zartrybn5jp11b",
          domain: 'www.betway.co.ke',
          httpOnly: true,
          maxAge: 3
      });

      var cookiejar = rp.jar();
      cookiejar.setCookie(cookie1, 'https://www.betway.co.ke/Event/FilterEvents');

      var options = {
        method: 'POST',
        uri: 'https://www.betway.co.ke/Event/FilterEvents',
        form: {
          couponTypeId: undefined,
          leagueIds: [
            "dcd52e45-3c2f-4ebd-acb1-bfeb96dd133d"
          ],
          marketTypeCategoryId: "00000000-0000-0000-da7a-000000580001"
        },
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            matches.push(this.parseMatches($, val));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeBetwaySerieA() {
    return new Promise((resolve, reject) => {
      let cookie1 = new tough.Cookie({
          key: "ASP.NET_SessionId",
          value: "nzrzspfiq2zartrybn5jp11b",
          domain: 'www.betway.co.ke',
          httpOnly: true,
          maxAge: 3
      });

      var cookiejar = rp.jar();
      cookiejar.setCookie(cookie1, 'https://www.betway.co.ke/Event/FilterEvents');

      var options = {
        method: 'POST',
        uri: 'https://www.betway.co.ke/Event/FilterEvents',
        form: {
          couponTypeId: undefined,
          leagueIds: [
            "563c3241-bf03-478b-8133-0bf5b222febb"
          ],
          marketTypeCategoryId: "00000000-0000-0000-da7a-000000580001"
        },
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            matches.push(this.parseMatches($, val));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeBetwayLigue1() {
    return new Promise((resolve, reject) => {
      let cookie1 = new tough.Cookie({
          key: "ASP.NET_SessionId",
          value: "nzrzspfiq2zartrybn5jp11b",
          domain: 'www.betway.co.ke',
          httpOnly: true,
          maxAge: 3
      });

      var cookiejar = rp.jar();
      cookiejar.setCookie(cookie1, 'https://www.betway.co.ke/Event/FilterEvents');

      var options = {
        method: 'POST',
        uri: 'https://www.betway.co.ke/Event/FilterEvents',
        form: {
          couponTypeId: undefined,
          leagueIds: [
            "284a32ce-a8f0-464e-8b99-ad0fc2f571d1"
          ],
          marketTypeCategoryId: "00000000-0000-0000-da7a-000000580001"
        },
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            matches.push(this.parseMatches($, val));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeBetwayBundesliga() {
    return new Promise((resolve, reject) => {
      let cookie1 = new tough.Cookie({
          key: "ASP.NET_SessionId",
          value: "nzrzspfiq2zartrybn5jp11b",
          domain: 'www.betway.co.ke',
          httpOnly: true,
          maxAge: 3
      });

      var cookiejar = rp.jar();
      cookiejar.setCookie(cookie1, 'https://www.betway.co.ke/Event/FilterEvents');

      var options = {
        method: 'POST',
        uri: 'https://www.betway.co.ke/Event/FilterEvents',
        form: {
          couponTypeId: undefined,
          leagueIds: [
            "9e46daea-dd10-4be0-8eff-1ce479f49cf3"
          ],
          marketTypeCategoryId: "00000000-0000-0000-da7a-000000580001"
        },
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
      };

      rp(options)
        .then($ => {
          let matches = [];
          $('.eventRow').each((ind, val) => {
            matches.push(this.parseMatches($, val));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  parseMatches($, val) {
    let elData = $(val).data();
      let prices = $(val).find('.outcome-pricedecimal');
      let league = $(val).find('.eventDetails label').first().text().split(':')[1].slice(3);
      let psuedoKey = (elData.eventtitle.split(' v ')[0].split(' ').join('') + elData.eventtitle.split(' v ')[1].split(' ').join('') + new Date(elData.eventdate).getTime()).toLowerCase();
      Match.findOne({'PsuedoKey': psuedoKey}, (err, existing) => {
        if (existing) {
          var matching = existing._doc.MatchInstances.find(el => {
            return el.Service = 'https://www.betway.co.ke/';
          })
          if (typeof matching === 'undefined') {
            existing._doc.MatchInstances.push({
              Service: 'https://www.betway.co.ke/',
              Team1: {
                Name: elData.eventtitle.split(' v ')[0],
                Price: $($(val).find('.outcome-pricedecimal')[0]).text().trim()
              },
              Team2: {
                Name: elData.eventtitle.split(' v ')[1],
                Price: $($(val).find('.outcome-pricedecimal')[2]).text().trim()
              },
              DrawPrice: $($(val).find('.outcome-pricedecimal')[1]).text().trim()
            })
            
            existing.save((err, updatedMatch) => {
              if (err) {
                console.log(err);
                return;
              }
              return updatedMatch;
            });
          }
        } else {
          new Match({
            PsuedoKey: psuedoKey,
            Sport: elData.sporttitle,
            League: league,
            Date: new Date(elData.eventdate).toISOString(),
            Team1: elData.eventtitle.split(' v ')[0],
            Team2: elData.eventtitle.split(' v ')[1],
            MatchInstances: [{
              Service: 'https://www.betway.co.ke/',
              Team1: {
                Name: elData.eventtitle.split(' v ')[0],
                Price: $($(val).find('.outcome-pricedecimal')[0]).text().trim()
              },
              Team2: {
                Name: elData.eventtitle.split(' v ')[1],
                Price: $($(val).find('.outcome-pricedecimal')[2]).text().trim()
              },
              DrawPrice: $($(val).find('.outcome-pricedecimal')[1]).text().trim()
            }]
          }).save((err, newMatch) => {
            if (err) {
              console.log(err);
              return;
            }
            return newMatch;
          });
        }
      });
  }

}

module.exports = OddsFinderScraper;