module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // інші плагіни тут...
      "react-native-reanimated/plugin",
    ],
  };
};
