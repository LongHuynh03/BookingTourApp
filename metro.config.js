const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Thêm cấu hình alias
config.resolver.extraNodeModules = {
  '@assets': path.resolve(__dirname, 'assets'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@config': path.resolve(__dirname, 'src/config'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@libs': path.resolve(__dirname, 'src/lib'),
};

module.exports = withNativeWind(config, { input: './global.css' });
