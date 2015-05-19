'use strict';

var TOKEN = 'a6b7adbdb7938cf059bdf7fe808ed02206198bc7';

var spark = require('spark');
var _ = require('lodash');
var moment = require('moment');
var Game = require('./api/game/game.model');

var updateGame = function(scoreboard){
  Game.find()
    .where('startDate').lte(moment().toDate())
    .where('endDate').equals(null)
    .exec(function (err, games) {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      if(games && games.length){
        var game = games[0];
        game.homeScore = scoreboard.scoreA;
        game.visitorScore = scoreboard.scoreB;   
        if(scoreboard.gameOver){
          game.endDate = new Date();
        }
        game.save();
      }
    });
}

console.log('[%s]: Logging on to particle', new Date());
spark.login({
  accessToken: TOKEN
}).then(
  function(token){
    console.log('[%s]: scoreboard initialized: ', new Date());
    
    spark.listDevices(function(err, devices) {
      if(devices && devices.length){
        var device = devices[0];
        console.log('[%s]: Device name: %s', new Date(), device.name);
        console.log('[%s]: - connected?: ', new Date(), device.connected);
      }
    });
    
    spark.getEventStream(false, 'mine', function(event) {
      if(event.name === 'score'){
        var scoreboard = JSON.parse(event.data);
        //console.log('[%s]: event: %s ', new Date(), JSON.stringify(scoreboard));
        updateGame(scoreboard);
      } else {
        console.log('[%s]: scoreboard %s %s', new Date(), event.name, event.data);
      }
    });
    
  },
  function(err) {
    console.log('[%s]: scoreboard login failed: %s', new Date(), err);
  }
);