import { enumGetMap } from "@/api/authorCms";

const user = {
    namespaced: true,

    state: {
        enums: {},
    },

    mutations: {
        SET_ENUMS(state, enums) {
            state.enums = enums;
        }
    },

    actions: {
        /**
         * 
         * 查询公共枚举
         */
        async enumGetMap({ dispatch, commit, getters, rootGetters }) {
            const res = await enumGetMap();

            if(res.code === "200") {
                commit('SET_ENUMS', res.data.enums);
            }
        }
    },

    getters: {
        /**
         * 通过 getters 获取公共枚举
         * @param {*} state 
         */
        enumsGetMap: state => name => {
            const { enums } = state;
            const keys = Object.keys(enums);

            if(keys.includes(name)) {
                return enums[name];
            }

            return [];
        },
    }
};

export default user;