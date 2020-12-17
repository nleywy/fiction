//关于权限的一些方法
// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';
const UserInfoKey = 'Admin-UserInfo';
const EnumsKey = 'Admin-Enum'

export function getToken() {
    return sessionStorage.getItem(TokenKey);
}
export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token);
}
export function removeToken() {
    return sessionStorage.removeItem(TokenKey);
}

export function getUserInfo() {
    const userInfo = sessionStorage.getItem(UserInfoKey);

    if(userInfo !== null) {
        return JSON.parse(userInfo);
    }

    return {};
}

export function setUserInfo(userInfo) {
    return sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo));
}
export function removeUserInfo() {
    return sessionStorage.removeItem(UserInfoKey);
}

export function getEnums() {
    const enums = sessionStorage.getItem(EnumsKey);

    if(enums !== null) {
        return JSON.parse(enums);
    }

    return {};
}

export function setEnums(Enums) {
    return sessionStorage.setItem(EnumsKey, JSON.stringify(Enums))
}

export function removeEnums() {
    return sessionStorage.removeItem(EnumsKey)
}