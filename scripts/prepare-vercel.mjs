import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const browserDir = resolve('dist', 'erp', 'browser');
const csrIndexPath = resolve(browserDir, 'index.csr.html');
const indexPath = resolve(browserDir, 'index.html');

if (existsSync(csrIndexPath)) {
  copyFileSync(csrIndexPath, indexPath);
  console.log('Prepared Vercel entrypoint: dist/erp/browser/index.html');
} else {
  console.log('Skipped Vercel entrypoint preparation: index.csr.html not found.');
}
