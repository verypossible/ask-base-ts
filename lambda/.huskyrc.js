const join = (...tasks) => tasks.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": join("npm run prettier:write", "cd ..", "git add ."),
  },
};
