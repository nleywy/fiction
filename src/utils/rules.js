// export const phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ig;

// export const phoneValidate = (rule, value, callback) => {
//     if (value.trim() === "") {
//         return callback(new Error('手机号码不能为空'));
//     }

//     const bool = phone.test(value);

//     if (!bool) {
//         callback(new Error('请输入正确的手机号码'));
//     } else {
//         callback();
//     }
// };

// 手机号码  宽松验证
export const mobile = /^(?:(?:\+|00)86)?1\d{10}$/

export const mobileValidator = (rule, value, callback) => {
    // 保证字段非必填也能通过验证
    if (!value) {
        return callback();
    }

    if (!mobile.test(value)) {
        return callback(new Error('您输入的内容格式不正确'))
    }

    callback()
}

// 座机(tel phone)电话(国内),如: 0341-8609123
export const phone = /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$|^\d{7,8}$/

export const phoneValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!phone.test(value)) {
        // return callback(new Error('您输入的内容格式不正确，请输入座机(tel phone)电话(国内),如: 0341-8609123'))
        // return callback(new Error('请输入座机(tel phone)电话(国内),如: 0341-8609123'))
        return callback(new Error('请输入座机电话(国内)，如: 0341-8609123'))
    }

    callback()
}


// 统一社会信用代码
export const uuitNo = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/

export const uuitNoValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!uuitNo.test(value)) {
        return callback(new Error('您输入的内容格式不正确'))
    }

    callback()
}

// email(邮箱)
export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const emailValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!email.test(value)) {
        return callback(new Error('您输入的内容格式不正确'))
    }

    callback()
}

// 整数
export const int = /^\d{1,}$/

export const intValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!int.test(value)) {
        return callback(new Error('您输入的内容格式不正确，只能输入整数'))
    }

    callback()
}

// 正数、负数、和小数
export const num = /^[0-9]+(.[0-9]{1,10})?$/

export const numberValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!num.test(value)) {
        return callback(new Error('请输入数字，且小数点后不能超过10位'))
    }

    callback()
}


// 经度
export const longitude = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/

export const longitudeValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!longitude.test(value)) {
        return callback(new Error('请输入经度，如：119.93691'))
    }

    callback()
}

// 纬度
export const latitude = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/

export const latitudeValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!latitude.test(value)) {
        return callback(new Error('请输入纬度，如：32.22693'))
    }

    callback()
}

// 网址
export const url = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/

export const urlValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!url.test(value)) {
        return callback(new Error('您输入的内容格式不正确'))
    }

    callback()
}

// 传真
export const fax = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/

export const faxValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!fax.test(value)) {
        return callback(new Error('请输入传真号码，如：1111-66222221'))
    }

    callback()
}

// 身份证号码
export const identity = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

export const identityValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!identity.test(value)) {
        return callback(new Error('您输入的内容格式不正确'))
    }

    callback()
}

export const percentage = /^(\d|[1-9][0-9]|100|[0-9]\.\d{1,2}|[1-9][0-9]\.\d{1,2})$/

export const percentageValidator = (rule, value, callback) => {
    if (!value) {
        return callback();
    }

    if (!percentage.test(value)) {
        return callback(new Error('请输入100以内的数字，小数点后最多2位数字'))
    }

    callback()
}