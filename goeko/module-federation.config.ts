import { ModuleFederationConfig } from '@nx/webpack';
// Core libraries such as react, angular, redux, ngrx, etc. must be
// singletons. Otherwise the applications will not work together.
const coreLibraries = new Set([
  '@angular/core',
  '@angular/common',
  '@angular/router',
  // A workspace library for a publish/subscribe
  // system of communication.
  '@ngx-translate/core',
]);

export const config = {
  // Share core libraries, and avoid everything else
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return {
        ...defaultConfig,
        singleton: true, // only a single version of the library should be loaded
        strictVersion: true,
      };
    }

    // Returning false means the library is not shared.
    return false;
  },
};

export default config;
