import request from '@/utils/request';

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

/**
 * 
 * 删除草稿
 * @param { number } draftId
 */
export const deleteChapterDraft = params => {
    return request({
        url: "/author/cms/chapter/deleteChapterDraft",
        method: 'post',
        data: params,
    });
}

/**
 * 
 * 保存编辑发布草稿章节
 * @description 作者保存编辑草稿，或直接发布草稿章节
 * @param { number } draftId 草稿id 有值：编辑草稿， 无值：新增草稿
 * @param { number } volumeId 分卷id
 * @param { string } chapterName 章节名
 * @param { string } content 章节内容
 * @param { string } publishType 1-及时，2-定时 （保存不发布时，可不传）
 * @param { date } scheduleTime 定时发布时需要传
 * @param { string } remark
 */
export const saveOrPublishChapter = params => {
    return request({
        url: "/author/cms/chapter/saveOrPublishChapter",
        method: 'post',
        data: params,
    });
}

/**
 * 
 * 根据id获取草稿详情
 * @param { number } draftId 草稿id
 */
export const getChapterDraftById = params => {
    return request({
        url: "/author/cms/chapter/getChapterDraftById",
        method: 'get',
        params,
    });
}

/**
 * 
 * 根据卷宗id获取章节列表
 * @param { number } volumeId 卷宗id
 * @param { number } pageNo
 * @param { number } pageSize
 */
export const getAppChapterListByVolumeId = params => {
    return request({
        url: "/author/cms/chapter/getAppChapterListByVolumeId",
        method: 'get',
        params,
    });
}