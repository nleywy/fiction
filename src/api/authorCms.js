import request from '@/utils/request'

/**
 * 
 * 登录接口
 */
export const login = params => {
    return request({
        url: "/author/cms/login/phone",
        method: 'post',
        data: params,
    });
}

/**
 * 
 * 发送短信
 */
export const getPhoneCode = params => {
    return request({
        url: "/author/cms/login/getPhoneCode",
        method: 'post',
        data: params,
    });
}

/**
 * 
 * 根据token获取作者个人信息
 */
export const getBookAuthor = params => {
    return request({
        url: "/author/cms/author/getBookAuthor",
        method: 'get',
    });
}

/**
 * 
 * 作者更改个人信息
 * @param { string } authorId 作者id
 * @param { string } photo 头像url
 * @param { string } penName 笔名
 * @param { string } sex 性别 0-保密，1-男，2-女
 * @param { string } notes 作者简介
 * @param { string } realName 真实姓名
 * @param { string } certificateType 证件类型	1-身份证，2-护照，3-军官证，4-学生证，5-港澳通行证，6-海外证件
 * @param { string } certificateNo 证件号
 * @param { string } provinceCode 省份编码
 * @param { string } provinceName 省份名称
 * @param { string } cityCode 城市编码
 * @param { string } cityName 城市名称
 * @param { string } orgCode 区域编码
 * @param { string } orgName 区域名称
 * @param { string } email 邮箱
 * @param { string } qq qq号
 * @param { string } wechat 微信号
 * @param { string } phone 手机号
 * @param { string } registerType 1-作者端，2-运营后台
 * @param { string } address 详细地址
 */
export const addOrUpdateBookAuthor = params => {
    return request({
        url: "/author/cms/author/addOrUpdateBookAuthor",
        method: 'post',
        data: params,
    });
}



/**
 * 
 * 判断作者笔名是否存在
 * @param { string } penName 笔名
 */
export const existPenName = params => {
    return request({
        url: "/author/cms/author/existPenName",
        method: 'get',
        params,
    });
}

/**
 * 
 * 书籍明细接口
 */
export const countIncome = params => {
    return request({
        url: "/author/cms/count/income",
        method: 'get',
        params,
    });
}

/**
 * 
 * 订阅统计接口
 */
export const countSubscribe = params => {
    return request({
        url: "/author/cms/count/subscribe",
        method: 'get',
        params,
    });
}

/**
 * 
 * 道具统计接口
 */
export const countReward = params => {
    return request({
        url: "/author/cms/count/reward",
        method: 'get',
        params,
    });
}

/**
 * 
 * 更新统计接口
 */
export const countUpdate = params => {
    return request({
        url: "/author/cms/count/update",
        method: 'get',
        params,
    });
}

/**
 * 
 * 作品列表接口
 */
export const bookGetAuthorBookList = params => {
    return request({
        url: "/author/cms/book/getAuthorBookList",
        method: 'get',
        params,
    });
}
