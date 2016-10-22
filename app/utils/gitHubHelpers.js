var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var secret = 'YOUR_SECRET_ID';
var parameter = '?client_id=' + id + '&client_secret=' + secret;

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username + parameter);
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + parameter + '&per_page=100');
}

function getTotalStars(repos) {
  return repos.data.reduce(function(previous, current) {
    return previous + current.stargazers_count
  }, 0);
}

function getPlayersData(player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    });
}

function calculateScores(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

var helpers = {
  getPlayersInfo: function(players) {
    return axios.all(players.map(function(username) {
      return getUserInfo(username);
    }))
    .then(function(info) {
      return info.map(function(user) {
        return user.data;
      });
    })
    .catch(function(error) {
      console.warn('Error in getPlayersInfo: ', error);
    });
  },
  battle: function(players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);
    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function(error) {
        console.warn('Error in getPlayersInfo: ', error);
      });
  }
};

module.exports = helpers;
