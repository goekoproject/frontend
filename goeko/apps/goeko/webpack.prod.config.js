const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation({
  ...config,
  output: {
    publicPath: 'auto',
    scriptType: 'text/javascript',
  },
  remotes: [
    ['home', 'https://goeko-c8a23.web.app/'],
    ['app2', 'https://app2.example.com'],
  ],
  /*
   * Remote overrides for production.
   * Each entry is a pair of an unique name and the URL where it is deployed.
   *
   * e.g.
   * remotes: [
   *   ['home':'https://goeko-c8a23.web.app/'],
   *   ['app2', 'https://app2.example.com'],
   * ]
   */
});
