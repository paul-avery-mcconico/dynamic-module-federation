module.exports = {
  husky: {
    hooks: {
      "pre-commit": "npm run lint && npm run prettier",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    },
  },
};
