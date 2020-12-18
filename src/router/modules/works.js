import layout from "@/pages/layout/index.vue";
import works from '@/pages/works/index.vue';

const worksRouter = [
    {
        path: '/works',
        component: layout,
        children: [
            {
                path: '',
                component: works,
                name: 'works'
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
    // {
    //     path: '/createWorkSuccess/:id',
    //     component: layout,
    //     name: 'createWorkSuccessWork',
    //     children: [
    //         {
    //             path: '',
    //             component: () => import('@/pages/works/createWorkSuccess.vue'),
    //         },
    //     ]
    // },
    {
        path: '/writing',
        component: layout,
        name: 'writing',
        meta: {
            hideLeftMenu: true,
        },
        children: [
            {
                path: '',
                component: () => import('@/pages/writing/index.vue'),
                children: [
                    {
                        path: '/writing/draft',
                        component: () => import('@/pages/writing/draft/index'),
                        name: 'draft',
                        meta: {
                            hideLeftMenu: true,
                        },
                    },
                    {
                        path: '/writing/volume',
                        component: () => import('@/pages/writing/volume/index'),
                        name:'volume',
                        meta: {
                            hideLeftMenu: true,
                        },
                    },
                    {
                        path: '/writing/published',
                        component: () => import('@/pages/writing/published/index'),
                        name: 'published',
                        meta: {
                            hideLeftMenu: true,
                        },
                    }
                ]
            },
        ]
    },
]

export default worksRouter;