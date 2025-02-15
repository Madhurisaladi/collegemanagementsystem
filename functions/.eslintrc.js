module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "object-curly-spacing": ["error", "never"], // ✅ Fix spacing issue
    "comma-dangle": ["error", "always-multiline"], // ✅ Fix missing comma issue
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
    {
      files: ["**/*.js", "**/*.jsx"], // ✅ Added required `files` property
      extends: ["react-app", "react-app/jest"],
    },
  ],
  globals: {},
};
