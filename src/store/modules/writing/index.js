export default {
    namespaced: true,
    state: {
        appBook: {},
        bookId: "",
    },
    mutations: {
        SET_APP_BOOK(state, appBook) {
            state.appBook = appBook;
        },
        SET_BOOKID(state, bookId) {
            state.bookId = bookId;
        },
    },
    actions: {

    },
}