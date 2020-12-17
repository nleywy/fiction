import request from '@/utils/request';

/**
 * 
 * 根据作品id获取卷宗列表
 * @param { number } bookId 书籍id
 */
export const getAppVolumeListByBookId = params => {
    return request({
        url: "/author/cms/volume/getAppVolumeListByBookId",
        method: "get",
        params,
    });
}
