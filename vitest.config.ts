import { defineVitestConfig } from '@nuxt/test-utils/config';
export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        dir: 'tests/unit',
        coverage: {
            reportsDirectory: 'coverage',
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
    },
});
