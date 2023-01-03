module.exports = {
  name: 'home',
  library: {
    type: 'module',
  },
  exposes: {
    './Module': 'apps/home/src/app/home/home.module.ts',
  },
};
