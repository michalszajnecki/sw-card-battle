import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

export default defineConfig<ConfigOptions>({
    testDir: 'tests/e2e',
    use: {
        nuxt: {
            rootDir: fileURLToPath(new URL('.', import.meta.url)),
        },
        baseURL: 'http://127.0.0.1:8117',
    },
});
