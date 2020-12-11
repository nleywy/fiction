import Axios from 'axios';
import Jsonp from 'jsonp';
import Vue from 'vue';
let vue = new Vue()
// import qs from 'qs';

var VUE_APP_API_HOST = process.env.VUE_APP_API_HOST;
/**
 * 发送ajax请求
 *
 * @param {string} obj ajax请求参数, 与 Jquery.ajax() 的参数相同
 * @param {string} obj 多个参数时, 可以同时发送N个异步请求, 当
 *        所有异步请求完成, 触发回调函数。
 * @return {Object} Promise 对象, 可以使用 Promise 对象的所有方法
 */
function Ajax() {
    let promises = Array.from(arguments).map(param => {
        // 格式化参数
        param = Object.assign({
            method: 'get',
            headers: {'Content-Type': 'application/json;charset=UTF-8',token:'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyVG9rZW4iLCJpc3MiOiJ4eW5vdmVsIiwidXNlcklkIjoiNjE2MDc2ODQ3NjQ0MTkifQ.4bWntzGZApaCSfaVjlXNjGO31tEkVhssrWVQQUFAZOo'},
            // withCredentials: false,
            params: (!param.method || param.method == 'get') && param.data,
            defaultErrorHandle: true,
        }, param);
        if(!param.isO2o){
            param.url = VUE_APP_API_HOST + param.url;
        }else{
            param.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        }
        if (param.method.toLowerCase() === 'post' && param.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            // param.data = qs.stringify(param.data || {});
        }
        return new Promise(function (resolve, reject) {
            if (param.dataType === 'jsonp') {
                // 跨域请求
                Jsonp(param.url, {param: param.data}, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                // 普通请求
                Axios(param).then(response => {
                    resolve(response);
                }).catch(response => {
                    reject(response);
                });
            }
        });
    });
    return Promise.all(promises).then(responses => {
        let errResponse = false;
        let code = responses.some(response => {
            let fail = response.data.code != 200?true:false;
            fail && (errResponse = response);
            return fail;
        });
        if (code) {
            let exception = new Error();

            exception.response = errResponse;
            throw exception;
        } else {
            return responses.length === 1 ? responses[0] : responses;
        }
    })
    .catch(e => {
        let response = e.response;
        if (response.config.defaultErrorHandle === true) {
            // 走默认异常处理
            if (response.data.code == 400) {
                // 业务异常
                vue.$alert(response.data.msg, '错误');
            } else {
                // 非业务错误异常(ex. 404 等异常)
                // vue.$alert('服务器错误，请稍后重试', '错误');
            }
            /*vue.$message({
                message: errorMessage,
                type: 'error'
            });*/
        } else if (response.config.defaultErrorHandle instanceof Function) {
            response.config.defaultErrorHandle(response);
        }
        throw e;
    });
}

// 扩展为 vue 插件模式
// vue.use(Ajax)后, 在组件中通过 this.$ajax() 调用
Ajax.install = function (Vue) {
    Vue.prototype.$ajax = Ajax;
};

export default Ajax;
