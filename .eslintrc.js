module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  extends: ["@dice-discord"],
  env: {
    browser: true,
    node: false,
    es6: false
  }
};
