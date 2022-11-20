<template>
  <div>
    <p>小滴课堂</p>
  </div>
  <el-button type="primary">Primary</el-button>
  <el-icon><House /></el-icon>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<script setup>
import { House } from "@element-plus/icons-vue";
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
div {
  p {
    color: aqua;
  }
}
</style>
