var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var secret = 'YOUR_SECRET_ID';
var parameter = '?client_id=' + id + '&client_secret=' + secret;

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username + parameter);
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
      console.warn('Error in getPlayersInfo', error);
    });
  }
};

module.exports = helpers;
