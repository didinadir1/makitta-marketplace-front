import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'makitta-front',
  webDir: 'dist',
  plugins: {
    App: {
      appUrlOpen: {
        enabled: true,
      },
    },
  },
};

export default config;