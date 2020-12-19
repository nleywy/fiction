import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import $router from "@/router";
// import store from '@/store'
import { getToken, removeAll } from '@/utils/auth'
const baseURL = process.env.NODE_ENV === 'production' ? "http://192.168.110.4/api" : process.env.VUE_APP_API_HOST;

//全局发送post请求的默认头部content-type类型,定义类型为JSON格式，并且字符编码为utf-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// create an axios instance
const service = axios.create({
    // 请求地址，不需要代理转发，后端开启跨域即可
    baseURL: baseURL,
    timeout: 15000, // request timeout
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

// 不需要token
const black = [ "/author/cms/login/phone", "/author/cms/login/getPhoneCode" ];

// request interceptor
service.interceptors.request.use(
    config => {
        if(!black.includes(config.url)) {
            config["headers"].token = getToken();
        }

        return config;
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        const res = response.data;
        if(res.code === "402") {
            // Alert('这是一段内容', '提示', {
            //     confirmButtonText: '确定',
            //     callback: action => {
            //         removeAll();
            //         $router.push({ name: login });
            //     }
            // });
            MessageBox.confirm('登录状态已失效，是否重新登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeAll();
                    $router.push({ name: "login" });
                }).catch(() => {
                    // no thing
                });
        }

        return res;
    },
    error => {
        //这里面是http的错误,给前端显示，方便处理
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
        //请求如果发生了错误,这里会率先拦截并打印错误
        //打印完毕后,进入到用户的catch中继续处理
        //这里其实可以考虑，将所有用户在请求中的错误在这里集中进行处理，并不在用户中再处理catch了...
        //除非是你有更进一步的关于catch的处理任务，否则，不需要重复的在业务逻辑中添加catch
    }
)

export default service