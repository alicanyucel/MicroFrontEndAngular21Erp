import { initNodeFederation } from '@softarc/native-federation-node';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverEntryDir = dirname(fileURLToPath(import.meta.url));
const browserBundlePath = resolve(serverEntryDir, '../browser');
const federationManifestPath = resolve(browserBundlePath, 'federation.manifest.json');

console.log('Starting SSR for Shell');

(async () => {
  await initNodeFederation({
    remotesOrManifestUrl: federationManifestPath,
    relBundlePath: browserBundlePath,
  });

  await import('./bootstrap-server');
})();
