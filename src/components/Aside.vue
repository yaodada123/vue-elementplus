<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <div class="xd-icon">
        <img src="../../public/keyboard.png" alt="" />
        <span>键盘管理系统</span>
      </div>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><ChatRound /></el-icon>
          <span>键位</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="courseHandle('front')">104键</el-menu-item>
          <el-menu-item index="1-2" @click="courseHandle('back')">87键</el-menu-item>
          <el-menu-item index="1-3" @click="courseHandle('all')">86键</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">仅仅占位测试</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { Location, ChatRound, Setting } from "@element-plus/icons-vue"; //引入icon图标
import { defineProps } from "vue";
const { isCollapse } = defineProps(["isCollapse"]);
import emmiter from "../utils/eventBus";


// 点击类目tab切换重新获取数据
const courseHandle = (type) => {
  emmiter.emit("course", type);
}
</script>

<style lang="less" scoped>
.el-radio-button__inner {
  padding: 0;
}

.el-menu--collapse {
  border: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border: none;
}

.xd-icon {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;
  background-color: #fff;
  white-space: nowrap;
  padding-left: 15px;

  img {
    width: 45px;
    height: 40px;
    margin-right: 10px;
  }
}
.xd-icon {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;
  background-color: #fff;
  white-space: nowrap;
  padding-left: 15px;

  img {
    width: 25px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>