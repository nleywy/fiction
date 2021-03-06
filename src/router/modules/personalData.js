import layout from "@/pages/layout/index.vue";

const personalDataRouter = [
    {
        path: '/personalData',
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/pages/personalData/index.vue'),
                name: 'personalData',
                meta: {
                    hideLeftMenu: true,
                    title: "个人中心",
                },
            },
        ]
    },
]

export default personalDataRouter;