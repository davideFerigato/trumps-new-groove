import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['apps/web/src/__tests__/**/*.test.ts'],
    exclude: ['node_modules', '.next', '.turbo', 'dist', '**/node_modules/**'],
  },
});
