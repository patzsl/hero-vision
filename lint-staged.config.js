module.exports = {
  'src/**/*.{js,ts,jsx,tsx,html}': ['eslint --fix', 'npx prettier --write', 'npm run test -- --coverage'],
};
