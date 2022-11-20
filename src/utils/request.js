import router from "../router/index";
import axios from "axios";
import { ElMessage } from "element-plus";

// 创建axios实例

const host = "http://127.0.0.1:3000"

const service = axios.create({
    baseURL: host,
    timeout: "3000"
})

// 设置请求拦截
service.interceptors.request.use((config) => {
    if(config.url.indexOf("login") < 0 && config.url.indexOf("register") < 0) {
        config.headers.authorization = localStorage.getItem("token");
    }
    return config;
})


// 设置响应拦截
service.interceptors.response.use((response) => {
    const {code, data, message} = response.data;
    if(code === 0) {
        return data;
    } else {
        ElMessage({
            message: message,
            type: "error"
        })
    }
    if(message == "token 校验失败") {
        router.push("/login")
    }
})


// 封装请求函数
const request = (option) => {
    if(option.method == "get") {
        option.params = option.data;
    }
    return service(option);
}

export default request;