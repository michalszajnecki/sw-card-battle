// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'theme-color', content: '#15738B' },
            ],
        },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    devServer: {
        port: 8117,
    },
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    devtools: { enabled: false },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
        // ...
        '@pinia/nuxt',
        // 'nuxt-graphql-request',
    ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
});
