module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
      'nativewind/babel',
    ],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],

          alias: {
            'tailwind.config': './tailwind.config.js',
            '@assets': './assets',
            '@components': './src/components',
            '@config': './src/config',
            '@constants': './src/constants',
            '@pages': './src/pages',
            '@services': './src/services',
            '@utils': './src/utils',
            '@libs':'./src/lib',
            '@navigations': './src/navigations'
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
