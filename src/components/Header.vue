<template>
  <div class="header">
    <div class="homeIcon" @click="changeCollapse">
      <el-icon
        size="30px"
        :style="{ transform: isCollapse ? '' : 'rotate(180deg)' }"
        ><Expand
      /></el-icon>
      <span>首页</span>
    </div>
    <div
      class="user"
      @mouseenter="isShowUserInfo('show')"
      @mouseleave="isShowUserInfo('leave')"
    >
      <img :src="userInfo.headImg" />
      <div class="userInfo" v-show="show">
        <div>{{ userInfo.userName }}</div>
        <div @click="loginOut">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Expand } from "@element-plus/icons-vue";
import { ref, defineProps, reactive, onMounted } from "vue";
import { getUserInfo } from "../api/index";

import router from "../router/index";

let show = ref(false);
const isShowUserInfo = (type) => {
  type === "show" ? (show.value = true) : (show.value = false);
};

// 获取父组件事件，进行折叠图标翻转
let { changeCollapse, isCollapse } = defineProps([
  "changeCollapse",
  "isCollapse",
]);

// 获取用户信息
let userInfo = reactive({
  userName: "",
  headImg: ""
})

const getUserInfoData = async ()=> {
  const res = await getUserInfo();
  if(res) {
    userInfo.userName = res.name;
    userInfo.headImg = res.head_img
  }
}

onMounted(() => {
  getUserInfoData();
})

// 退出登录
const loginOut = () => {
  router.push("/login");
  localStorage.removeItem("token")
}

</script>

<style lang='less' scoped>
.userInfo {
  z-index: 22;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: -70px;
  background-color: #fff;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;

  div:hover {
    color: #409eff;
  }

  div {
    padding: 10px;
  }
  &:hover {
    cursor: pointer;
  }
}

.header {
  position: relative;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .homeIcon {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  .user {
    display: flex;
    justify-content: center;
    width: 80px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>