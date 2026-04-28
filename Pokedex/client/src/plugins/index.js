import router from '../router';
import i18n from './i18n';
import { createPinia } from 'pinia';

// Plugins
import vuetify from './vuetify'

// Usunęliśmy "import type { App } from 'vue'" - w JS tego nie potrzebujemy

export function registerPlugins (app) { 
 // Usunęliśmy ": App" - w JS nie definiujemy typów po dwukropku
 app.use(vuetify)
 app.use(createPinia());
 app.use(i18n);
 app.use(router);
}
