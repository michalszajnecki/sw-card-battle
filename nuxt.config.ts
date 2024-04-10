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
        // layoutTransition: { name: 'layout', mode: 'out-in' },
        // pageTransition: { name: 'page', mode: 'out-in' },
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
        '@pinia/nuxt',
    ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    runtimeConfig: {
        FB_API_KEY: process.env.FB_API_KEY,
        FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
        FB_PROJECT_ID: process.env.FB_PROJECT_ID,
        FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
        FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
        FB_APP_ID: process.env.FB_APP_ID,
        FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
        public: {
            FB_API_KEY: process.env.FB_API_KEY,
            FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
            FB_PROJECT_ID: process.env.FB_PROJECT_ID,
            FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
            FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
            FB_APP_ID: process.env.FB_APP_ID,
            FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
        },
    },
});
