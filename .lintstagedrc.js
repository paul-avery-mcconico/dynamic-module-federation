module.exports = {
  '**/*.{js,jsx,ts,tsx': ['eslint'],
  '**/*': ['pretty-quick --staged', 'git add'],
}
