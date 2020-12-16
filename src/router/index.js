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
        //   redirect:'subscribe',
          children: [
            {
              path: '/data/subscribe',
              component: () => import('@/pages/data/subscribe'),
              name:'subscribe'
            }
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
          path: '/writing/:bookId',
          component: () => import('@/pages/writing/index.vue'),
          name: 'writing',
          children: [
            {
              path: '/writing/draft/:bookId',
              component: () => import('@/pages/writing/draft/index'),
              name:'draft'
            },
            {
              path: '/writing/volume/:bookId',
              component: () => import('@/pages/writing/volume/index'),
              name:'volume'
            },
          ]
        }

    ]
})
export default router