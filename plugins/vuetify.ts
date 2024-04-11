// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import { md2 } from 'vuetify/blueprints';

const mySWTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#292746',
        surface: '#191D38',
        primary: '#FC0858',
        'primary-darken-1': '#FC0858',
        secondary: '#7A788B',
        'secondary-darken-1': '#292746',
    },
    variables: {
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.6,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.04,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.12,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#F5F5F5',
        'theme-on-code': '#000000',
    },
};

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        blueprint: md2,
        theme: {
            defaultTheme: 'mySWTheme',
            themes: {
                mySWTheme,
            },
        },
    });
    app.vueApp.use(vuetify);
});
