<template>
  <div class="main">
    <!-- 搜索框 -->
    <div>
      <el-form>
        <el-form-item>
          <el-input
            v-model.trim="inputValue"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="selectClick">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <Table
      :list="courseList"
      :editCilck="editCilck"
      :deleteHandle="deleteHandle"
    />
    <Pagination :currentChange="currentChange" />
  </div>
  <EditPop
    :popShow="popShow"
    :message="courseItemState.message"
    v-if="popShow"
    :confirmClick="confirmClick"
  />
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import Table from "./Table.vue";
import EditPop from "./EditPop.vue";
import Pagination from "./Pagination.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { getCourse, changeCourse, deleteCourse } from "../api/index";
import emmiter from "../utils/eventBus"
const data = reactive({
  list: [],
  page: 1,
  total: 15,
  sideCategory: 'front'
});



/**
 * 课程编辑逻辑
 */
const changeCourseData = async (query) => {
  const {title, price, id} = query;
  const res = await changeCourse({title, price, id});
  console.log("这是课程编辑返回的res", res);
  if(res?.message) {
    ElMessage({
      message: "修改成功",
      type: "success"
    })
  }
  
}

// 编辑的数据
const courseItemState = reactive({
  message: {},
});

// 控制对话框的展示
const popShow = ref(false);
// 控制对话框展示的方法
const isShowPop = (show) => {
  popShow.value = show;
};

// 编辑的按钮
const editCilck = (val) => {
  isShowPop(true);
  courseItemState.message = val;
};

// 确认按钮逻辑
const confirmClick = (val) => {
  if (val === "cancel") {
    isShowPop(false);
  } else if (
    val.title !== courseItemState.message.title ||
    val.price !== courseItemState.message.price
  ) {
    // 修改对应课程
    data.list.map((item) => {
      if (item.id == val.id) {
        item.title = val.title;
        item.price = val.price;
      }
    });

    // 修改之后关闭弹窗
    isShowPop(false);
    changeCourseData({title: val.title, price: val.price, id: val.id})
  } else {
    ElMessage({
      showClose: true,
      message: "您未修改任何内容",
      type: "warning",
    });
  }
};

// 删除逻辑
const deleteCourseData = async (query) => {
  const res = await deleteCourse({id: query});
  console.log(res);
  if(res?.message) {
    ElMessage({
      message: "删除成功",
      type: "success"
    })
  }

  // 当数据清零时返回第一页
  if(data.list.length == 0 && data.page > 1) {
    data.page = 1;
    getCourseData({category: data.sideCategory, page: 1})

  }
}

const deleteHandle = (val) => {
  data.list = data.list.filter((item) => {
    return item.id !== val;
  });
  deleteCourseData(val)
};

// 搜索框逻辑
let inputValue = ref("");
const courseList = computed(() => {
  return data.list?.filter((item) => {
    return item.title.indexOf(inputValue.value) >= 0;
  });

  // 接口逻辑
});

const selectClick = () => {
  if (inputValue.value) {
    ElMessage({
      message: "搜索成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "请输入搜索内容",
      type: "warning",
    });
  }
};

// 分页逻辑
const currentChange = (val) => {
  if (val === "pre") {
    if (data.page > 1) {
      data.page--;
    } else {
      ElMessage({
        message: "我的宝，这已经是第一页了",
        type: "warning",
      });
    }
  } else if (val == "next") {
    if (data.page < Math.ceil(data.total / 5)) {
      data.page++;
    } else {
      ElMessage({
        message: "我的宝，这已经是最后一页了",
        type: "warning",
      });
    }
  }

  //请求课程的接口
  getCourseData({ category: data.sideCategory, page: data.page })
};


// 获取课程数据
const getCourseData = async (query) => {
  const category = query?.category|| data.sideCategory;
  const page = query?.page||1;
  const count = query?.total||5;
  const res = await getCourse({ category, page, count });
  // console.log("这是请求课程数据获得的响应数据:", res);
  data.list = res.list.filter((item) => {
    return item.category === category;
  })

}



onMounted(() => {
  getCourseData();
  // 点击类目tab栏进行切换
  emmiter.on("course",(val) => {
    data.sideCategory = val;
    data.page = 1
    getCourseData({category: val, page: 1})
  })
})
</script>

<style lang='less' scoped>
.el-form {
  display: flex;
}

.main {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  position: fixed;
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none;
}
</style>

