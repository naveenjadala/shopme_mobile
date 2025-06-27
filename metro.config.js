const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    resolver: {
      extraNodeModules: {
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@types": path.resolve(__dirname, "src/types"),
        "@store": path.resolve(__dirname, "src/store"),
        "@api": path.resolve(__dirname, "src/api"),
        "@theme": path.resolve(__dirname, "src/theme"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@navigation": path.resolve(__dirname, "src/navigation"),
        "@src": path.resolve(__dirname, "src")
      },
    },
    watchFolders: [path.resolve(__dirname, "src")],
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
