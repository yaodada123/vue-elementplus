import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: "/login"
        },
        {
            path: '/login',
            component: () => import("../views/Login.vue")
        },
        {
            path: '/home',
            component: () => import("../views/Home.vue"),
            meta: {
                isAuth: true
            }
        },
        {
            path: '/register',
            component: () => import("../views/Register.vue")
        }
    ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
    if(to.meta.isAuth) {
        if(localStorage.getItem("token")) {
            next();
        } else {
            ElMessage({
                showClose: true,
                message: '亲，请先登录！！！',
                type: 'warning',
              })
        }
    } else {
        next();
    }
})

export default router