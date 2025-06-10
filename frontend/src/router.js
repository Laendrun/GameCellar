import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import GameDetails from '@/views/GameDetails.vue';
import i18n from '@/i18n';

const supportedLangauges = ['en', 'fr'];

const routes = [
  {
    path: '/:lang(en|fr)?',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'game/:id', name: 'GameDetails', component: GameDetails },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const lang = to.params.lang;

  if (!supportedLangauges.includes(lang)) {
    return next({
      path: `/${i18n.global.locale}${to.fullPath.replace(/^\/[^/]+/, '')}`,
    });
  }

  next();
});

export default router;
