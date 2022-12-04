import middleware from '@/router/middleware';

import HomeWrapper from '@/views/home/HomeWrapper';
import HomeIndex from '@/views/home/HomeIndex';

import AuthWrapper from '@/views/auth/AuthWrapper';
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";

import ArticlesShow from '@/views/articles/ArticlesShow';

// import ArticleShow from '@/views/article/ArticleShow';


export default [
  {
    path: '/',
    component: HomeWrapper,
    children: [
      {
        path: '',
        name: 'home_index',
        beforeEnter: middleware.guest,
        component: HomeIndex
      },
      {
        path: 'articles/:id',
        name: 'articles_show',
        beforeEnter: middleware.guest,
        component: ArticlesShow
      },
      // {
      //   path: 'blogs/:id/articles/:articleId',
      //   name: 'articles_show',
      //   beforeEnter: middleware.guest,
      //   component: ArticleShow
      // }
    ],
  },
  {
    path: '/auth/',
    component: AuthWrapper,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        beforeEnter: middleware.guest,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        beforeEnter: middleware.guest,
      },
    ],
  },
]