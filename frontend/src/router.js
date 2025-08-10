import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import GameDetails from '@/views/GameDetails.vue';
import Login from '@/views/Login.vue';
import i18n from '@/i18n';

const supportedLanguages = ['fr'];

const routes = [
  {
    path: '/:lang(fr)?',
    component: () => import('./layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'game/:id', name: 'GameDetails', component: GameDetails },
      { path: 'login', name: 'Login', component: Login },
    ],
  },
  {
    path: '/',
    redirect: () => {
      const browserLang = navigator.language.split('-')[0];
      const lang = supportedLanguages.includes(browserLang)
        ? browserLang
        : 'fr';
      return `/${lang}`;
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/fr',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const lang = to.params.lang;

  if (!supportedLanguages.includes(lang)) {
    return next({
      path: `/fr${to.fullPath.replace(/^\/[^/]+/, '')}`,
    });
  }
  if (i18n.global.locale.value !== lang) {
    i18n.global.locale.value = lang;
  }

  next();
});

export default router;
