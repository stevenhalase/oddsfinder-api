const rp = require('request-promise');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const Match = require('./models/MatchModel');

var express = require('express');
var router = express.Router();

class OddsFinderScraper {

  constructor() {
    this.services = {
      betway: {
        url: 'https://www.betway.co.ke/',
        region: 'Kenya'
      },
      merryBet: {
        url: 'https://www.merrybet.com',
        region: 'Nigeria'
      }
    }
    this.leagues = {
      premierLeague: 'Premier League',
      eflCup: 'League Cup',
      laLiga: 'La Liga',
      serieA: 'Serie A',
      ligue1: 'Ligue 1',
      bundesliga: 'Bundesliga'
    }
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
            matches.push(this.parseBetwayMatches($, val, this.services.betway.url, this.services.betway.region, this.leagues.premierLeague));
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
            matches.push(this.parseBetwayMatches($, val, this.services.betway.url, this.services.betway.region, this.leagues.eflCup));
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
            matches.push(this.parseBetwayMatches($, val, this.services.betway.url, this.services.betway.region, this.leagues.laLiga));
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
            matches.push(this.parseBetwayMatches($, val, this.services.betway.url, this.services.betway.region, this.leagues.serieA));
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
            matches.push(this.parseBetwayMatches($, val, this.services.betway.url, this.services.betway.region, this.leagues.ligue1));
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
            matches.push(this.parseBetwayMatches($, val, this.services.betway.url, this.services.betway.region, this.leagues.bundesliga));
          })
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  parseBetwayMatches($, val, service, region, league) {
    let elData = $(val).data();
    let prices = $(val).find('.outcome-pricedecimal');
    let psuedoKey = (elData.eventtitle.split(' v ')[0].split(' ').join('') + elData.eventtitle.split(' v ')[1].split(' ').join('') + new Date(elData.eventdate).getTime()).toLowerCase();
    Match.find({}, (err, matches) => {
      let existing = this.findExisting(psuedoKey, matches);

      if (existing && existing._doc.League === league) {
        var matching = existing._doc.MatchInstances.find(el => {
          return el._doc.Service === service;
        })
        if (typeof matching === 'undefined') {
          existing._doc.MatchInstances.push({
            Service: service,
            Region: region,
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

          existing.markModified('MatchInstances');
          
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
            Service: service,
            Region: region,
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
    })
  }

  scrapeMerryBetPremierLeague() {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        uri: 'https://www.merrybet.com/rest/market/category/events/1060/1',
        json: true
      };

      rp(options)
        .then(res => {
          let resMatches = res.data;
          let matches = [];
          for (let match of resMatches) {
            matches.push(this.parseMerryBetJSONMatches(match, this.services.merryBet.url, this.services.merryBet.region, this.leagues.premierLeague));
          }
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeMerryBetEFLCup() {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        uri: 'https://www.merrybet.com/rest/market/category/events/1627/1',
        json: true
      };

      rp(options)
        .then(res => {
          let resMatches = res.data;
          let matches = [];
          for (let match of resMatches) {
            matches.push(this.parseMerryBetJSONMatches(match, this.services.merryBet.url, this.services.merryBet.region, this.leagues.eflCup));
          }
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeMerryBetLaLiga() {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        uri: 'https://www.merrybet.com/rest/market/category/events/1587/1',
        json: true
      };

      rp(options)
        .then(res => {
          let resMatches = res.data;
          let matches = [];
          for (let match of resMatches) {
            matches.push(this.parseMerryBetJSONMatches(match, this.services.merryBet.url, this.services.merryBet.region, this.leagues.laLiga));
          }
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeMerryBetSerieA() {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        uri: 'https://www.merrybet.com/rest/market/category/events/3340/1',
        json: true
      };

      rp(options)
        .then(res => {
          let resMatches = res.data;
          let matches = [];
          for (let match of resMatches) {
            matches.push(this.parseMerryBetJSONMatches(match, this.services.merryBet.url, this.services.merryBet.region, this.leagues.serieA));
          }
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeMerryBetLigue1() {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        uri: 'https://www.merrybet.com/rest/market/category/events/1648/1',
        json: true
      };

      rp(options)
        .then(res => {
          let resMatches = res.data;
          let matches = [];
          for (let match of resMatches) {
            matches.push(this.parseMerryBetJSONMatches(match, this.services.merryBet.url, this.services.merryBet.region, this.leagues.ligue1));
          }
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  scrapeMerryBetBundesliga() {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        uri: 'https://www.merrybet.com/rest/market/category/events/1087/1',
        json: true
      };

      rp(options)
        .then(res => {
          let resMatches = res.data;
          let matches = [];
          for (let match of resMatches) {
            matches.push(this.parseMerryBetJSONMatches(match, this.services.merryBet.url, this.services.merryBet.region, this.leagues.bundesliga));
          }
          resolve();
        })
        .catch(err => {
            reject(err);
        });
      
    })
  }

  parseMerryBetJSONMatches(match, service, region, league) {
    let sport = match.category1Name;
    let psuedoKey = (match.eventGames[0].outcomes[0].outcomeName.split(' ').join('') + match.eventGames[0].outcomes[2].outcomeName.split(' ').join('') + new Date(match.eventStart).getTime()).toLowerCase();
    Match.find({}, (err, matches) => {
      let existing = this.findExisting(psuedoKey, matches);

      if (existing) {
        var matching = existing._doc.MatchInstances.find(el => {
          return el._doc.Service === service;
        })
        if (typeof matching === 'undefined') {
          existing._doc.MatchInstances.push({
            Service: service,
            Region: region,
            Team1: {
              Name: match.eventGames[0].outcomes[0].outcomeName,
              Price: match.eventGames[0].outcomes[0].outcomeOdds
            },
            Team2: {
              Name: match.eventGames[0].outcomes[2].outcomeName,
              Price: match.eventGames[0].outcomes[2].outcomeOdds
            },
            DrawPrice: match.eventGames[0].outcomes[1].outcomeOdds
          })

          existing.markModified('MatchInstances');
          
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
          Sport: sport,
          League: league,
          Date: new Date(match.eventStart).toISOString(),
          Team1: match.eventGames[0].outcomes[0].outcomeName,
          Team2: match.eventGames[0].outcomes[2].outcomeName,
          MatchInstances: [{
            Service: service,
            Region: region,
            Team1: {
              Name: match.eventGames[0].outcomes[0].outcomeName,
              Price: match.eventGames[0].outcomes[0].outcomeOdds
            },
            Team2: {
              Name: match.eventGames[0].outcomes[2].outcomeName,
              Price: match.eventGames[0].outcomes[2].outcomeOdds
            },
            DrawPrice: match.eventGames[0].outcomes[1].outcomeOdds
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

  findExisting(psuedoKey, matches) {
    if (matches.length < 1) {
      return null;
    }  
    let mostSimilar = matches[0];
    for (let match of matches) {
      if (this.similarity(psuedoKey, match._doc.PsuedoKey) > this.similarity(psuedoKey, mostSimilar._doc.PsuedoKey) && this.similarity(psuedoKey, match._doc.PsuedoKey) > 0.5) {
        mostSimilar = match;
      }
    }
    return this.similarity(psuedoKey, mostSimilar._doc.PsuedoKey) > .5 ? mostSimilar : null;
  }

  editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }
}

router.get('/startBetway', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwayPremierLeague()
  oddsFinderScraper.scrapeBetwayEFLCup()
  oddsFinderScraper.scrapeBetwayLaLiga()
  oddsFinderScraper.scrapeBetwaySerieA()
  oddsFinderScraper.scrapeBetwayLigue1(),
  oddsFinderScraper.scrapeBetwayBundesliga()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startBetwayPremierLeague', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwayPremierLeague()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startBetwayEFLCup', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwayEFLCup()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startBetwayLaLiga', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwayLaLiga()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startBetwayLigue1', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwayLigue1()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startBetwaySerieA', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwaySerieA()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startBetwayBundesliga', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeBetwayBundesliga()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBetPremierLeague', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetPremierLeague()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBet', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetPremierLeague()
  oddsFinderScraper.scrapeMerryBetEFLCup()
  oddsFinderScraper.scrapeMerryBetLaLiga()
  oddsFinderScraper.scrapeMerryBetSerieA()
  oddsFinderScraper.scrapeMerryBetLigue1(),
  oddsFinderScraper.scrapeMerryBetBundesliga()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBetEFLCup', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetEFLCup()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBetLaLiga', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetLaLiga()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBetLigue1', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetLigue1()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBetSerieA', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetSerieA()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})

router.get('/startMerryBetBundesliga', function(req, res) {
  oddsFinderScraper = new OddsFinderScraper();
  oddsFinderScraper.scrapeMerryBetBundesliga()
    .then(() => {
      res.json('{ success : true }');
    })
    .catch((err) => {
      res.json('{ success : false }');
    })
})


module.exports = router;