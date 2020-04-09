const withPlugins = require("next-compose-plugins");
const withSass = require('@zeit/next-sass');
// const withPWA = require('next-pwa')
// const settings = {
//   env: {
//   },
//   devIndicators: {
//     autoPrerender: false,
//   },
//   pwa: {
//     dest: 'public',
//   },
// };
module.exports = process.env.NODE_ENV === 'development' ? withSass({}) : withPlugins(
  [
    [withSass],
    // [withPWA,
    //   settings
    // ]
  ],
  { /* nextConfig options here */ }
)
