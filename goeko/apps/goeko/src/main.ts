import { setRemoteDefinitions } from '@nrwl/angular/mf';
import { environment } from './environments/environment';

let url_module_federation_manifest = '/assets/module-federation.manifest.json';  
if (environment.production) { 
  url_module_federation_manifest = '/assets/module-federation.manifest.pro.json';
}


fetch(url_module_federation_manifest)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
