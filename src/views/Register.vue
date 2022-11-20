<template>
  <div class="register">
    <div class="bgp">
      <img
        style="max-width: 100%; max-height: 50%"
        src="../assets/bgp_r.jpg"
        alt=""
      />
    </div>
    <div class="register_container">
      <h1>管理系统</h1>
      <el-form
        class="register_form"
        :model="userInfo"
        :rules="rules"
        @keyup.enter="onRegister"
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
        <el-button type="primary" class="register_submit" @click="onRegister"
          >注册</el-button
        >
        <div class="register_register" @click="toGo">已有账号，去登录</div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { House, Avatar, Key } from "@element-plus/icons-vue"; // 引入图标
import { reactive, ref } from "vue";
import router from "../router/index";
import { getRegister } from "../api/index.js";

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
const getRegisterData = async() => {
  const res = await getRegister({
    userName: userInfo.username,
    password: userInfo.password,
  });
  // 如果校验成功
  if (res?.message) {
    ElMessage({
      message: "注册成功",
      type: "success",
    });
    router.push("/login");
  }

};

// 登录的方法
const onRegister = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getRegisterData();
    }
  });
};

// 跳转登录
const toGo = () => {
  router.push("/login");
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

.register {
  height: 100%;

  .el-icon {
    height: 30px !important;
  }

  .register_container {
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

    .register_form {
      .register_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .register_register {
        width: 6.25rem;
        font-size: 0.875rem;
        margin: 0 auto;
        &:hover {
          color: rgb(115, 0, 255);
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