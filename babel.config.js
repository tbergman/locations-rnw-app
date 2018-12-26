module.exports = function(api) {

  api.cache(true);
  return {
  "plugins": [
      ["module-resolver", {
        "alias": {
          "^react-native$": "react-native-web",
          'react-native-maps': 'react-native-web-maps',
        }
      }]
    ],
    presets: [["react-app"], ['babel-preset-expo']],
  };
};
