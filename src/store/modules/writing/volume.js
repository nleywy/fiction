import { Message } from "element-ui";

export default {
    namespaced: true,
    state: {
        bookId: "",
        appVolumeList: [],
        activeData: {},
        sortNum: 0,
        isUpdate: false,
        active: 0,
    },
    mutations: {
        SET_APP_VOLUME_LIST(state, appVolumeList) {
            // state.appVolumeList = appVolumeList;
            const list = [ ...state.appVolumeList, ...appVolumeList ];
            const arr = [];
            state.appVolumeList = list.filter(item => {
                if(arr.includes(item.volumeId)) {
                    return false;
                }else {
                    arr.push(item.volumeId);
                    return true;
                }
            })
        },
        SET_BOOKID(state, bookId) {
            state.bookId = bookId;
        },
        SET_ACTIVE_DATA(state, activeData) {
            state.activeData = activeData;
        },
        SET_SORT_NUM(state, sortNum) {
            state.sortNum = sortNum;
        },
        SET_IS_UPDATE(state, isUpdate) {
            state.isUpdate = isUpdate;
        },
        SET_ACTIVE(state, active) {
            state.active = active;
        },
        /**
         * 
         * 添加卷
         */
        ADD_VOLUME(state) {
            const data = state.appVolumeList[0];
            const sortNum = data.sortNum + 1;

            if(data.chapterCount <= 0) {
                Message.warning("上一卷尚未发布章节，无法新建卷");
                return ;
            }

            const params = {
                title: "新建卷",
                chapterCount: 0,
                bookId: state.bookId,
                sortNum,
                notes: "",
            };
            state.appVolumeList = [ params, ...state.appVolumeList ];
            state.activeData = { ...params };
            state.sortNum = state.activeData.sortNum;
            state.isUpdate = true;
            state.active = 0;
        }
    },
    actions: {

    },
}