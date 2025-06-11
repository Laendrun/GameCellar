import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    appTitle: 'Game Cellar',
    home: 'Home',
    language: 'Language',
    gameDetails: 'Game details',
    players: 'players',
    min: 'min',
    gameRules: 'Game Rules',
  },
  fr: {
    appTitle: 'Game Cellar',
    home: 'Accueil',
    language: 'Langage',
    gameDetails: 'Détails du Jeu',
    players: 'joueurs',
    min: 'min',
    gameRules: 'Règles du jeu',
  },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
