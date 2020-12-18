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

/**
 * 
 * 根据作品id获取卷宗列表
 * @param { number } volumeId 卷宗id	
 */
export const getAppVolumeById = params => {
    return request({
        url: "/author/cms/volume/getAppVolumeById",
        method: "get",
        params,
    });
}

/**
 * 
 * 新增修改分卷
 * @description 描述：作者新增或修改分卷
 * @param { number } volumeId 卷宗id
 * @param { string } title 分卷名称
 * @param { number } bookId 书籍id
 * @param { number } sortNum 分卷排序值
 * @param { string } notes 简介
 */
export const addOrUpdateAppVolume = params => {
    return request({
        url: "/author/cms/volume/addOrUpdateAppVolume",
        method: "post",
        data: params,
    });
}

/**
 * 
 * 作者删除分卷
 * @param { number } volumeId 卷宗id	
 */
export const deleteAppVolume = params => {
    return request({
        url: "/author/cms/volume/deleteAppVolume",
        method: "post",
        data: params,
    });
}

// /**
//  * 
//  * 根据作品id获取卷宗列表
//  * @param { number } bookId 卷宗id
//  * @param { number } pageNo
//  * @param { number } pageSize
//  */
// export const getAppVolumeListByBookId = params => {
//     return request({
//         url: "/author/cms/volume/getAppVolumeListByBookId",
//         method: 'get',
//         params,
//     });
// }