import layout from "@/pages/layout/index.vue";

const dataRouter = [
    {
        path: '/data',
        component: layout,
        redirect: '/data/subscribe',
        name: 'dataCenter',
        children: [
            {
                path: '',
                component: () => import('@/pages/data/index.vue'),
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
        ]
    },
]

export default dataRouter;