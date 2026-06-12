import { defineConfig } from '@apps-in-toss/web-framework/config';
import launchConfig from './toss.launch.config';
import featuresConfig from './toss.features.config';

type Permission =
  | { name: 'clipboard'; access: 'read' | 'write' }
  | { name: 'camera'; access: 'access' }
  | { name: 'photos'; access: 'read' };

const permissions: Permission[] = [
  featuresConfig.permissions.clipboardRead ? { name: 'clipboard', access: 'read' } : null,
  featuresConfig.permissions.clipboardWrite ? { name: 'clipboard', access: 'write' } : null,
  featuresConfig.permissions.camera ? { name: 'camera', access: 'access' } : null,
  featuresConfig.permissions.photosRead ? { name: 'photos', access: 'read' } : null,
].filter((permission): permission is Permission => permission != null);

export default defineConfig({
  appName: launchConfig.appName,
  brand: {
    displayName: launchConfig.displayName,
    primaryColor: launchConfig.primaryColor,
    icon: launchConfig.iconUrl,
  },
  web: {
    host: launchConfig.devHost,
    port: launchConfig.devPort,
    commands: {
      dev: 'vite --host 0.0.0.0',
      build: 'tsc -b && vite build',
    },
  },
  permissions,
  outdir: 'dist',
  webViewProps: {
    type: launchConfig.webViewType,
  },
});
