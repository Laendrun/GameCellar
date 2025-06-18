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
    login: 'Login',
    'login-btn': 'Login',
    username: 'Username',
    password: 'Password',
    'invalid-credentials': 'Invalid credentials',
    'login-error': 'An error occured during login',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    'no-rules': 'No rules available in this language.',
    boxContent: 'Box Content',
  },
  fr: {
    appTitle: 'Game Cellar',
    home: 'Accueil',
    language: 'Langage',
    gameDetails: 'Détails du Jeu',
    players: 'joueurs',
    min: 'min',
    gameRules: 'Règles du jeu',
    login: 'Connexion',
    'login-btn': 'Se connecter',
    username: 'Nom utilisateur',
    password: 'Mot de passe',
    'invalid-credentials': 'Données de connexion invalides',
    'login-error': 'Une erreur est survenue pendant la connexion',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    'no-rules': 'Pas de règle disponible dans ce langage.',
    boxContent: 'Contenu de la boîte',
  },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
