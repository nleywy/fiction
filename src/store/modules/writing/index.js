export default {
    namespaced: true,
    state: {
        appBook: {},
    },
    mutations: {
        SET_APP_BOOK(state, appBook) {
            state.appBook = appBook;
        }
    },
    actions: {

    },
}