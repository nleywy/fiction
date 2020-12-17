import request from '@/utils/request';

/**
 * 
 * 申请上架或申请签约
 * @param { number } bookId
 * @param { number } bookState
 */
export const applyShelfOrSign = params => {
    return request({
        url: "/author/cms/book/applyShelfOrSign",
        method: 'post',
        data: params,
    });
};

/**
 * 
 * 作品列表接口
 * @param { number } pageNo
 * @param { number } pageSize
 */
export const getAuthorBookList = params => {
    return request({
        url: "/author/cms/book/getAuthorBookList",
        method: 'get',
        params,
    });
};

/**
 * 
 * 根据书籍id获取作品信息
 * @param { number } bookId
 */
export const getAppBookDetailById = params => {
    return request({
        url: "/author/cms/book/getAppBookDetailById",
        method: 'get',
        params,
    });
};

/**
 * 
 * 新增编辑作品
 * @param { number } bookId 书籍id 无值：新增， 有值：编辑
 * @param { string } imgUrl 书籍封面url
 * @param { string } blurryImgUrl 缩略图
 * @param { number } authorId 作者id
 * @param { string } authorName 作者名称
 * @param { string } bookName 书籍名称
 * @param { number } firstClassify 一级分类id	
 * @param { string } startStation 首发站 1-次元姬，2-外站
 * @param { string } tagId 书签id 英文,拼接
 * @param { string } notes 作品简介
 */
export const addOrUpdateAuthorBook = params => {
    return request({
        url: "/author/cms/book/addOrUpdateAuthorBook",
        method: 'post',
        data: params,
    });
};

/**
 * 
 * 判断书名是否存在
 * @param { string } bookName
 */
export const existBookName = params => {
    return request({
        url: "/author/cms/book/existBookName",
        method: 'get',
        params,
    });
};