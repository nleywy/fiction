import layout from "@/pages/layout/index.vue";

const booksRouter = [
    {
        path: '/books',
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/pages/books/index.vue'),
                name: 'books'
            },
        ]
    },
]

export default booksRouter;