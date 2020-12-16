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

// login().then(res => {
//     console.log(res);
// })

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

/**
 * 
 * 获取公共枚举
 */
export const enumGetMap = list => {
    // return new Promise((resolve, reject) => {
    //     request({
    //         url: "/author/cms/enum/getMap",
    //         method: 'get',
    //     }).then(res => {
    //         if(res.status === "200") {
    //             resolve(res);
    //         }

    //         resolve(res);
    //     }).catch(err => {
    //         reject(err);
    //     })
    // })

    return request({
        url: "/author/cms/enum/getMap",
        method: 'get',
    });
}
