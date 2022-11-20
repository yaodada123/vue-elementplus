<template>
  <div class="login">
    <div class="bgp">
      <img
        style="max-width: 100%; max-height: 50%"
        src="../assets/bgp.jpg"
        alt=""
      />
    </div>
    <div class="login_container">
      <h1>管理系统</h1>
      <el-form
        class="login_form"
        :model="userInfo"
        :rules="rules"
        @keyup.enter="onLogin"
        ref="ref_form"
      >
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model.trim="userInfo.username">
            <template #prepend>
              <el-icon>
                <Avatar />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model.trim="userInfo.password"
          >
            <template #prepend>
              <el-icon>
                <Key />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="login_submit" @click="onLogin"
          >登录</el-button
        >
        <div class="login_register" @click="toGo">去注册</div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { House, Avatar, Key } from "@element-plus/icons-vue"; // 引入图标
import { reactive, ref } from "vue";
import router from "../router/index";
import { getLogin } from "../api/index";

// 初始化ref_form
const ref_form = ref(null);

const userInfo = reactive({
  username: "",
  password: "",
});

// 定义数据校验规则d
const rules = reactive({
  username: [{ required: "true", trigger: "blur", message: "用户名不能为空" }],
  password: [{ required: "true", trigger: "blur", message: "密码不能为空" }],
});

// 登录接口校验
const getLoginData = async () => {
  const res = await getLogin({
    userName: userInfo.username,
    password: userInfo.password,
  });
  if (res?.token) {
    localStorage.setItem("token", res.token);
    ElMessage({
      message: "登录成功！！！",
      type: "success",
    });
    router.push("/home");
  }
};

// 登录的方法
const onLogin = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getLoginData();
    }
  });
};

// 跳转注册
const toGo = () => {
  router.push("/register");
};
</script>
<style lang='less' scoped>
// @-webkit-keyframes fadenum {
//   0% {
//     opacity: 0;
//   }

//   100% {
//     opacity: 1;
//   }
// }

.login {
  height: 100%;

  .el-icon {
    height: 30px !important;
  }

  .login_container {
    animation: fadenum 1s ease;
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    background-color: rgba(254, 254, 254, 0.5);
    border-radius: 10px;
    padding: 20px;

    h1 {
      font-size: 24px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el-card {
      border-radius: 20px;
    }

    .login_form {
      .login_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .login_register {
        width: 6.25rem;
        font-size: 0.875rem;
        margin: 0 auto;
        &:hover {
          color: aqua;
          cursor: pointer;
        }
      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>