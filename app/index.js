var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js');

var sentryKey = '09f2c119670d486586a7ec7b905e7dd5';
var sentryApp = '92066';
var sentryURL = 'https://' + sentryKey + '@app.getsentry.com/' + sentryApp;

var _APP_INFO = {
  name: 'GitHub Battle',
  branch: 'master',
  version: '1.0'
};

Raven.config(sentryURL, {
  release: _APP_INFO.version,
  tags: {
    branch: _APP_INFO.branch
  }
}).install();

ReactDOM.render(
  routes,
  document.getElementById('app')
);
