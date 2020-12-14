import request from '@/utils/request'

export const login = params => {
    return request({
        url: "/author/common/login/phone",
        method: 'post',
        data: {
            "phone":"18888888888",
            "phoneCode":"3062"
        },
    })
}

// login().then(res => {
//     console.log(res);
// })

export const countIncome = params => {
    return request({
        url: "/author/cms/count/income",
        method: 'get',
        params,
    })
}