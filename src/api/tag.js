import request from '@/utils/request';

/**
 * 
 * 获取标签列表
 * @description 获取小说一级分类列表
 * @param { string } name
 * @param { number } pageNo
 * @param { number } pageSize
 */
export const getBookTagListByParams = params => {
    return request({
        url: "/author/cms/tag/getBookTagListByParams",
        method: 'get',
        params,
    });
};