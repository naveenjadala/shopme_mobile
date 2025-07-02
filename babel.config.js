module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@components": "./src/components",
          "@utils": "./src/utils",
          "@types": "./src/types",
          "@store": "./src/store",
          "@api": "./src/api",
          "@theme": "./src/theme",
          "@hooks": "./src/hooks",
          "@styles": "./src/styles",
          "@pages": "./src/pages",
          "@assets": "./src/assets",
          "@navigation": "./src/navigation",
          "@shared": "./src/shared",
          "@features": "./src/features",
          "@src": "./src"
        }
      }
    ]
  ]
};