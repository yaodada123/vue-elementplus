<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header><Header :changeCollapse = "changeCollapse" :isCollapse="isCollapse" /></el-header>
        <el-main><Main /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
import Main from "../components/Main.vue";
import router from "../router/index";

// 实现侧边栏展开折叠效果
let isCollapse = ref(false);
let changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
}

const toGo = (path) => {
  router.push(path);
};
</script>

<style lang='less' scoped>
.el-aside {
  width: auto;
  background-color: #545c64;
  overflow: hidden;
}
.el-container {
  height: 100vh;
  // 浏览器内部的可视区域的高度大小
}
.el-main {
  display: flex;
}
</style>