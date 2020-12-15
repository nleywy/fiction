import Vue from "vue";
import Router from "vue-router";
import layoutRouters from "./modules/layout";

Vue.use(Router);

/**
 * 
 * 路由抽离出来，防止后面路由过多
 */
const router = new Router({
    routes: [
        { 
          path: '/',
          redirect:'works'
        },
        {
          path: '/login',
          component: () => import('@/pages/login/index.vue'),
        },
    ]
});

router.addRoutes(layoutRouters);

export default router