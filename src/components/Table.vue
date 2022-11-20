<template>
  <div class="table">
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column prop="course_img" label="图片">
        <template #default="scope">
          <img :src="scope.row.course_img" class="courseImg-img" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="point" label="评分"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="操作" #default="scope">
        <el-button type="warning" @click="editCilck(scope.row)">编辑</el-button>
        <el-popconfirm title="我的宝，你确定要删除我吗" @confirm="deleteHandle(scope.row.id)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const { list, editCilck, deleteHandle } = defineProps(["list", "editCilck", "deleteHandle"]);
const tableRowClassName = ({rowIndex}) => {
    return rowIndex % 2 == 0 ? "" : "warning-row";
}
</script>

<style lang='less' scoped>
.courseImg-img {
  width: 150px;
  height: 100px;
}
</style>