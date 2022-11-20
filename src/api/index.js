import request from "@/utils/request";

// 注册接口
export const getRegister = (data) => {
    return request({ method: "post", url: "/api/v1/user/register", data })
}


// 登录接口
export const getLogin = (data) => {
    return request({ method: "post", url: "/api/v1/user/login", data })
}


// 获取用户信息
export const getUserInfo = (data) => {
    return request({ method: "get", url: "/api/v1/user/userInfo", data })
}


// 课程查询接口
export const getCourse = (data) => {
    return request({ method: "get", url: "/api/v1/course/search", data })
}

// 课程编辑接口
export const changeCourse = (data) => {
    return request({ method: "get", url: "/api/v1/course/update", data })
}


// 课程删除接口
export const deleteCourse = (data) => {
    return request({ method: "get", url: "/api/v1/course/delete", data })
}

