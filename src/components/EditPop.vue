<template>
  <div>
    <el-dialog
      title="编辑"
      width="30%"
      v-model="popShow"
      :show-close="false"
      center
    >
      <el-form :model="editData" ref="ruleFormRef">
        <el-form-item label="课程标题" prop="title" required>
          <el-input v-model="editData.title"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" required>
          <el-input v-model="editData.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="confirmClick('cancel')">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const { popShow, message, confirmClick } = defineProps([
  "popShow",
  "message",
  "confirmClick",
]);

// 编辑数据获取
const editData = reactive({
  title: message.title,
  price: message.price,
  id: message.id,
});

// 提交修改数据
let ruleFormRef = ref(null);

const submitForm = async (elForm) => {
  if (!elForm) return;
  await elForm.validate((valid, fileds) => {
    if (valid) {
      confirmClick({
        title: editData.title,
        price: editData.price,
        id: editData.id,
      });
    } else {
      console.log("修改失败", fileds);
    }
  });
};
</script> 

<style lang='less' scoped>
</style>