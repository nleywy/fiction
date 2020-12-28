import { getChapterDraftListByBookId } from "@/api/chapter";

export default {
    namespaced: true,
    state: {
        draftListaft: [],
        bookId: 0,
        draftId: 0,
        active: 0,
        bookId: 0,
    },
    mutations: {
        SET_DRAFT_LISTAFT(state, draftListaft) {
            const list = [ ...state.draftListaft, ...draftListaft ];
            const arr = [];
            state.draftListaft = list.filter(item => {
                if(arr.includes(item.draftId)) {
                    return false;
                }else {
                    arr.push(item.draftId);
                    return true;
                }
            })
        },
        SET_ACTIVE(state, active) {
            state.active = active;
        },
        SET_DRAFTID(state, draftId) {
            state.draftId = draftId;
        },
        SET_BOOKID(state, bookId) {
            state.bookId = bookId;
        },
        /**
         * 
         * 添加草稿
        */
        ADD_DRAFT(state) {
            state.draftListaft = [
                {
                    chapterName: "无章节名" ,
                    wordCount: 0,
                    draftId: null,
                },
                ...state.draftListaft,
            ];
            state.draftId = null;
            state.active = 0;
        }
    },
    actions: {
        getChapterDraftListByBookId({ state }) {
            return new Promise(async (resolve, reject) => {
                const res = await getChapterDraftListByBookId({ bookId: state.bookId, pageNo: 1, pageSize: 100000 });

                if(res.code === "200") {
                    const draftListaft = res.data.draftListaft;
    
                    resolve(draftListaft);
                }

                resolve([]);
            });
        }
    },
}