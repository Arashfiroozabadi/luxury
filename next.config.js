const withPlugins = require("next-compose-plugins");
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
module.exports = process.env.NODE_ENV === 'development' ? {} : withPlugins(
  [
    // [withPWA,
    //   settings
    // ]
  ],
  { /* nextConfig options here */ }
)
