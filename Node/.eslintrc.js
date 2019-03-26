module.exports = {
    "parser": "babel-eslint",
    "extends": ["eslint-config-airbnb"],
     "rules": {
    "func-names": ["error", "never"],
    "react/prefer-stateless-function": [0, {"ignorePureComponents": true}],
    "import/no-extraneous-dependencies": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/extensions": [1, { "extensions": [".js", ".jsx"] }],
    "no-else-return":0,
    "max-len": [2, 150],
  }
};
