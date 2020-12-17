import request from '@/utils/request'

/**
 * 
 * 获取草稿箱内容列表
 * @param { number } bookId
 * @param { number } pageNo
 * @param { number } pageSize
 */
export const getChapterDraftListByBookId = params => {
    return request({
        url: "/author/cms/chapter/getChapterDraftListByBookId",
        method: 'get',
        params,
    });
}