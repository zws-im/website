module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  extends: ["@dice-discord", "plugin:@typescript-eslint/recommended"],
  env: {
    browser: true,
    node: false,
    es6: false
  },
  globals: {
    gtag: "readonly",
    Sentry: "readonly",
    dataLayer: "readonly"
  },
  parser: "@typescript-eslint/parser"
};
