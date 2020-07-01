const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const optimizedImages = require('next-optimized-images');

module.exports = process.env.NODE_ENV === 'development'
  ? withPlugins([
    withPWA({}),
    optimizedImages({
      optimizeImagesInDev: true,
    }),
  ], {
    env: {
      tokenKey: 'djdammasdesjuskesmuskjkjds',
    },
  })
  : withPlugins([
    withPWA({}),
    optimizedImages({
      optimizeImagesInDev: true,
    }),
  ], {
    env: {
      tokenKey: 'djdammasdesjuskesmuskjkjds',
    },
  });
