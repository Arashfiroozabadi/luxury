const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const optimizedImages = require('next-optimized-images');
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
module.exports = process.env.NODE_ENV === 'development'
  ? withPlugins([
    // withImages({
    //   assetPrefix: 'locallhost:8080',
    // }),
  ])
  : withPlugins(
    [
      // [optimizedImages, {}],
      // withImages(),
    // [withPWA,
    //   settings
    // ]
    ],
    { /* nextConfig options here */ },
  );
