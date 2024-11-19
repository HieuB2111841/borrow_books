
import { createRouter, createWebHistory  } from 'vue-router';

import HomePage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';
import BooksPage from './views/BooksPage.vue';
import BookDetails from './views/BookDetails.vue';
import NotFound from './views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'Home' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { title: 'Log in' }
  },
  {
    path: '/books/',
    name: 'books',
    component: BooksPage,
    meta: { title: 'Books' }
  },
  {
    path: '/books/:slug',
    name: 'book-detail',
    component: BookDetails,
    props: true,
    meta: { title: 'Loading...' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { title: 'Not Found' }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Cập nhật title sau khi chuyển route
router.afterEach((to) => {
  const defaultTitle = 'Borrow book'; // Title mặc định
  document.title = to.meta.title || defaultTitle;
});

export default router;
