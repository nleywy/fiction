import request from '@/utils/request';

/**
 * 
 * 获取标签列表
 * @description 获取小说一级分类列表
 * @param { string } name
 * @param { number } pageNo
 * @param { number } pageSize
 */
export const logout = params => {
    return request({
        url: "/author/cms/login/logout",
        method: 'post',
    });
};