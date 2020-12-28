import { Message } from "element-ui";
import { getAppVolumeListByBookId, getAppVolumeById, addOrUpdateAppVolume, deleteAppVolume } from "@/api/volume";
import { v4 as uuidv4 } from "uuid";

export default {
    namespaced: true,
    state: {
        bookId: "",
        appVolumeList: [],
        activeData: {},
        sortNum: 0,
        isUpdate: false,
        active: 0,
        volumeId: 0,
    },
    mutations: {
        SET_APP_VOLUME_LIST(state, appVolumeList) {
            state.appVolumeList = appVolumeList;
            // const list = [ ...state.appVolumeList, ...appVolumeList ];
            // const arr = [];
            // state.appVolumeList = list.filter(item => {
            //     if(arr.includes(item.volumeId)) {
            //         return false;
            //     }else {
            //         arr.push(item.volumeId);
            //         return true;
            //     }
            // })
        },
        SET_VOLUMEID(state, volumeId) {
            state.volumeId = volumeId;
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
        /**
         * 
         * 根据作品id获取卷宗列表
         * @param { number } bookId 书籍id
         */
        async getAppVolumeListByBookId(params) {
            const { state, commit, dispatch, rootState } = params
            const res = await getAppVolumeListByBookId({ bookId: rootState.writingIndex.bookId, time: uuidv4(), });
            
            if(res.code === "200") {
                const appVolumeList = res.data.appVolumeList;
                commit("SET_APP_VOLUME_LIST", appVolumeList);

                if(Array.isArray(state.appVolumeList) && state.appVolumeList.length ) {
                    const volume = state.appVolumeList[0];

                    commit("SET_VOLUMEID", volume.volumeId);
                    commit("SET_ACTIVE", 0);
                    if(!volume.volumeId) {
                        commit("SET_ACTIVE_DATA", volume);
                        commit("SET_SORT_NUM", state.activeData.sortNum);
                    }else {
                        dispatch("getAppVolumeById")
                    }
                }
            }
        },

        /**
         * 
         * 根据作品id获取卷宗详情
         * @param { number } volumeId 卷宗id
         */
        async getAppVolumeById({ state, commit }) {
            const res = await getAppVolumeById({ volumeId: state.volumeId });
            
            if(res.code === "200") {
                commit("SET_ACTIVE_DATA", res.data.appVolume);
                commit("SET_SORT_NUM", state.activeData.sortNum);
            }
        },
    },
}