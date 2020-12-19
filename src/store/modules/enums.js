import { enumGetMap } from "@/api/enums";
import { setEnums, getEnums } from "@/utils/auth";
const enums = getEnums();

export default {
    namespaced: true,

    state: {
        enums: enums,
        bookStateStatus: {
            0: 'warning',
            1: 'success',
            2: 'warning',
            3: 'success',
            4: 'success',
            5: 'success',
            6: 'success',
            7: 'success',
            8: 'success',
            9: 'danger',
        },
        endStateStatus: {
            1: 'success',
            2: 'warning',
        },
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
                setEnums(res.data.enums)
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
            const enums  = state.enums;
            const keys = Object.keys(enums);

            if(keys.includes(name)) {
                return enums[name];
            }

            return [];
        },
    }
};