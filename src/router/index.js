import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import works from '../pages/works/index.vue'
const router = new Router({
    routes: [
        { 
            path: '/',
            redirect:'works'
        },
        {
          path: '/works',
          component: works,
          name: 'works',
        },
        {
          path: '/data',
          component: () => import('@/pages/data/index.vue'),
          name: 'dataCenter',
          redirect: '/data/subscribe',
          children: [
            {
              path: '/data/subscribe',
              component: () => import('@/pages/data/components/subscribe'),
              name: 'subscribe'
            },
            {
              path: '/data/vote',
              component: () => import('@/pages/data/components/vote'),
              name: 'vote'
            },
            {
              path: '/data/update',
              component: () => import('@/pages/data/components/update'),
              name: 'update'
            },
          ]
        },
        {
          path: '/books',
          component: () => import('@/pages/books/index.vue'),
          name: 'books'
        },
        {
          path: '/createWork/:id',
          component: () => import('@/pages/works/create.vue'),
          name: 'createWork'
        },
        {
          path: '/createWorkSuccess/:id',
          component: () => import('@/pages/works/createWorkSuccess.vue'),
          name: 'createWorkSuccessWork'
        },
        {
          path: '/writing',
          component: () => import('@/pages/writing/index.vue'),
          name: 'writing',
          children: [
            {
              path: '/writing/draft/:id',
              component: () => import('@/pages/writing/draft/index'),
              name:'draft'
            }
          ]
        },

    ]
})
export default router