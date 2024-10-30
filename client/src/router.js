
import { createRouter, createWebHistory  } from 'vue-router';

import HomePage from './views/HomePage.vue';
import BookDetails from './views/BookDetails.vue';
import NotFound from './views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/books/:slug',
    name: 'BookDetail',
    component: BookDetails,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
