import { defineConfig } from "cypress";
import coverage from '@cypress/code-coverage/task.js'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      coverage(on, config)

      return config
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  env: {
    codeCoverage: {
      exclude: ['cypress/**/*.*', '**/*.test.*', '**/*.spec.*'],
    }
  }
});
