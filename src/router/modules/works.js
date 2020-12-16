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
        path: '/createWork/:id',
        component: layout,
        name: 'createWork',
        children: [
            {
                path: '',
                component: () => import('@/pages/works/create.vue'),
            },
        ]
    },
    {
        path: '/createWorkSuccess/:id',
        component: layout,
        name: 'createWorkSuccessWork',
        children: [
            {
                path: '',
                component: () => import('@/pages/works/createWorkSuccess.vue'),
            },
        ]
    },
    {
        path: '/writing',
        component: layout,
        name: 'writing',
        children: [
            {
                path: '',
                component: () => import('@/pages/writing/index.vue'),
                children: [
                    {
                        path: '/writing/draft/:id',
                        component: () => import('@/pages/writing/draft/index'),
                        name: 'draft'
                    },
                    {
                      path: '/writing/volume/:bookId',
                      component: () => import('@/pages/writing/volume/index'),
                      name:'volume'
                    },
                ]
            },
        ]
    },
]

export default worksRouter;