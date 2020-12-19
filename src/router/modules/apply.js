import layout from "@/pages/layout/index.vue";

const applyRouter = [
    {
        path: '/applySuccess',
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/pages/apply/index.vue'),
                name: 'applySuccess',
                meta: {
                    hideLeftMenu: true,
                    title: "作家申请",
                },
            },
        ]
    },
]

export default applyRouter;