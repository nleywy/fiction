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
            state.draftListaft = draftListaft;
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
        /**
         * 
         * 获取草稿箱内容列表
         */
        async getChapterDraftListByBookId({ state, rootState, commit }, draftId) {
            const res = await getChapterDraftListByBookId({ bookId: rootState.writingIndex.bookId, pageNo: 1, pageSize: 100000 });

            if(res.code !== "200") {
                return ;
            }

            const draftListaft = res.data.draftListaft;
            
            if(Array.isArray(draftListaft)) {
                commit("SET_DRAFT_LISTAFT", draftListaft);
            }

            if(draftListaft.length == 0){
                commit("ADD_DRAFT");
            }else{
                const findIndex = state.draftListaft.findIndex(item => item.draftId === draftId);

                if(findIndex !== -1) {
                    commit("SET_ACTIVE", findIndex);
                    commit("SET_DRAFTID", draftId);
                }else {
                    commit("SET_ACTIVE", 0);
                    commit("SET_DRAFTID", state.draftListaft[0].draftId);
                }
            }
        }
    },
}