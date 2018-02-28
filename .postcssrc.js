module.exports = {
  plugins: {
    "autoprefixer": {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    },
    'postcss-viewport-units': {}
  }
};
