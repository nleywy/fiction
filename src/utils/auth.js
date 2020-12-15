//关于权限的一些方法
// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';
const UserInfoKey = 'Admin-UserInfo';

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