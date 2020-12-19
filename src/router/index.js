import Vue from "vue";
import Router from "vue-router";
import layoutRouters from "./modules/layout";
import { getToken } from "@/utils/auth";

Vue.use(Router);

/**
 * 
 * 路由抽离出来，防止后面路由过多
 */
const router = new Router({
    // mode: "hash",
    mode: "hash",
    routes: [
        {
            path: '/',
            redirect: 'works'
        },
        {
            path: '/login',
            component: () => import('@/pages/login/index.vue'),
            name: "login",
        },
    ]
});

/**
 * 
 * 动态添加一下布局路由
 */
router.addRoutes(layoutRouters);

const white = ['/login']

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if(white.includes(to.path)) {
            next(from.fullPath);
        }else {
            next();
        }
    }else {
        if(white.includes(to.path)) {
            next();
        }else {
            next('/login');
        }
    }
})

export default router;