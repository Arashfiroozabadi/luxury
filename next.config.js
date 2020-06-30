const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

module.exports = process.env.NODE_ENV === 'development'
  ? withPlugins([
    withPWA({}),
  ], {
    env: {
      tokenKey: 'djdammasdesjuskesmuskjkjds',
    },
  })
  : withPlugins([
    withPWA({}),
  ], {
    env: {
      tokenKey: 'djdammasdesjuskesmuskjkjds',
    },
  });
