import request from '@/utils/request';

/**
 * 
 * 获取公共枚举
 */
export const enumGetMap = list => {
    return request({
        url: "/author/cms/enum/getMap",
        method: 'get',
    });
};