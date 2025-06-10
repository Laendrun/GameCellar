import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    appTitle: 'Game Cellar',
    home: 'Home',
    language: 'Language',
    gameDetails: 'Game details',
  },
  fr: {
    appTitle: 'Game Cellar',
    home: 'Accueil',
    language: 'Langage',
    gameDetails: 'Détails du Jeu',
  },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
