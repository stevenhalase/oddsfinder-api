var MatchModel = require('../models/MatchModel.js');

/**
 * MatchController.js
 *
 * @description :: Server-side logic for managing Matchs.
 */
module.exports = {

    /**
     * MatchController.list()
     */
    list: function (req, res) {
        MatchModel.find(function (err, Matchs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Match.',
                    error: err
                });
            }
            return res.json(Matchs);
        });
    },

    /**
     * MatchController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        MatchModel.findOne({_id: id}, function (err, Match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Match.',
                    error: err
                });
            }
            if (!Match) {
                return res.status(404).json({
                    message: 'No such Match'
                });
            }
            return res.json(Match);
        });
    },

    /**
     * MatchController.create()
     */
    create: function (req, res) {
        var Match = new MatchModel({
          PsuedoKey : req.body.PsuedoKey,
          Service: req.body.Service,
          Date : req.body.Date,
          Team1 : req.body.Team1,
          Team2 : req.body.Team2,
          DrawPrice : req.body.DrawPrice,
          Sport : req.body.Sport
        });

        Match.save(function (err, Match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Match',
                    error: err
                });
            }
            return res.status(201).json(Match);
        });
    },

    /**
     * MatchController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        MatchModel.findOne({_id: id}, function (err, Match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Match',
                    error: err
                });
            }
            if (!Match) {
                return res.status(404).json({
                    message: 'No such Match'
                });
            }

            Match.PsuedoKey = req.body.PsuedoKey ? req.body.PsuedoKey : Match.PsuedoKey;
            Match.Service = req.body.Service ? req.body.Service : Match.Service;
            Match.Date = req.body.Date ? req.body.Date : Match.Date;
            Match.Team1 = req.body.Team1 ? req.body.Team1 : Match.Team1;
            Match.Team2 = req.body.Team2 ? req.body.Team2 : Match.Team2;
            Match.DrawPrice = req.body.DrawPrice ? req.body.DrawPrice : Match.DrawPrice;
            Match.Sport = req.body.Sport ? req.body.Sport : Match.Sport;
			
            Match.save(function (err, Match) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Match.',
                        error: err
                    });
                }

                return res.json(Match);
            });
        });
    },

    /**
     * MatchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        MatchModel.findByIdAndRemove(id, function (err, Match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Match.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
