module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@app": "./src/app",
            "@shared": "./src/shared",
            "@entities": "./src/entities",
            "@features": "./src/features",
            formik: "./src/shared/lib/formik",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
