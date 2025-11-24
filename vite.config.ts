/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import {defineConfig, loadEnv} from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_MEDUSA_BASE || "/"
  const BACKEND_URL = env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const STOREFRONT_URL =
    env.VITE_MEDUSA_STOREFRONT_URL || "http://localhost:8000"
  const PUBLISHABLE_API_KEY = env.VITE_MEDUSA_PUBLISHABLE_API_KEY || ""
  const TALK_JS_APP_ID = env.VITE_TALK_JS_APP_ID || ""
  const DISABLE_SELLERS_REGISTRATION =
    env.VITE_DISABLE_SELLERS_REGISTRATION || "false"
  const DEFAULT_REGION = env.VITE_DEFAULT_REGION || ""
  const STRIPE_KEY = env.VITE_STRIPE_KEY || ""
  const SITE_NAME = env.VITE_SITE_NAME || ""
  const SITE_DESCRIPTION = env.VITE_SITE_DESCRIPTION || ""
  const ALGOLIA_ID = env.VITE_ALGOLIA_ID || ""
  const ALGOLIA_SEARCH_KEY = env.VITE_ALGOLIA_SEARCH_KEY || ""
  const GOOGLE_IOS_CLIENT_ID = env.VITE_GOOGLE_IOS_CLIENT_ID || ""
  const VITE_GOOGLE_WEB_CLIENT_ID = env.VITE_GOOGLE_WEB_CLIENT_ID || ""
  const GOOGLE_CALLBACK_URL = env.VITE_GOOGLE_CALLBACK_URL || ""

  return {
    plugins: [
      react(),
      legacy()
    ],
    define: {
      __BASE__: JSON.stringify(BASE),
      __BACKEND_URL__: JSON.stringify(BACKEND_URL),
      __STOREFRONT_URL__: JSON.stringify(STOREFRONT_URL),
      __PUBLISHABLE_API_KEY__: JSON.stringify(PUBLISHABLE_API_KEY),
      __TALK_JS_APP_ID__: JSON.stringify(TALK_JS_APP_ID),
      __DISABLE_SELLERS_REGISTRATION__: JSON.stringify(
        DISABLE_SELLERS_REGISTRATION
      ),
      __DEFAULT_REGION__: JSON.stringify(DEFAULT_REGION),
      __STRIPE_KEY__: JSON.stringify(STRIPE_KEY),
      __SITE_NAME__: JSON.stringify(SITE_NAME),
      __SITE_DESCRIPTION__: JSON.stringify(SITE_DESCRIPTION),
      __ALGOLIA_ID__: JSON.stringify(ALGOLIA_ID),
      __ALGOLIA_SEARCH_KEY__: JSON.stringify(ALGOLIA_SEARCH_KEY),
      __GOOGLE_IOS_CLIENT_ID__: JSON.stringify(GOOGLE_IOS_CLIENT_ID),
      __GOOGLE_WEB_CLIENT_ID__: JSON.stringify(VITE_GOOGLE_WEB_CLIENT_ID),
      __GOOGLE_CALLBACK_URL__: JSON.stringify(GOOGLE_CALLBACK_URL),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    }
  }

})
