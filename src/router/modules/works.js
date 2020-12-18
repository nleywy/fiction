import layout from "@/pages/layout/index.vue";
import works from '@/pages/works/index.vue';

const worksRouter = [
    {
        path: '/works',
        component: layout,
        redirect: '/works/management',
        meta: {
            title: "作品管理",
        },
        name: 'works',
        children: [
            {
                path: 'management',
                component: works,
            },
            {
                path: '/writing',
                component: () => import('@/pages/writing/index.vue'),
                name: 'writing',
                children: [
                    {
                        path: 'draft',
                        component: () => import('@/pages/writing/draft/index'),
                        name: 'draft',
                        meta: {
                            hideLeftMenu: true,
                            title: "草稿箱",
                        },
                    },
                    {
                        path: 'volume',
                        component: () => import('@/pages/writing/volume/index'),
                        name:'volume',
                        meta: {
                            hideLeftMenu: true,
                            title: "分卷管理",
                        },
                    },
                    {
                        path: 'published',
                        component: () => import('@/pages/writing/published/index'),
                        name: 'published',
                        meta: {
                            hideLeftMenu: true,
                            title: "已发章节",
                        },
                    }
                ]
            },
        ]
    },
    {
        path: '/createWork',
        component: layout,
        name: 'createWork',
        children: [
            {
                path: 'start',
                name: "createWorkStart",
                component: () => import('@/pages/works/create.vue'),
            },
            {
                path: 'success',
                component: () => import('@/pages/works/createWorkSuccess.vue'),
            },
        ]
    },

]

export default worksRouter;