const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {assetExts, sourceExts} = require('metro-config/src/defaults/defaults');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
