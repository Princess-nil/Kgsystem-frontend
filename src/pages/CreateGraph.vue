<template>
  <div id="CreateGraph">
    <h1>当前位置：构建图谱</h1>
  </div>

  <div class="select">
    <h1>请选择数据包：</h1>
    <el-select
      v-model="value"
      placeholder="选择……"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>

  <div class="filenum">
    文件总数：
    {{ 23 }}
  </div>
</template>
    
<script>
import { ref } from "vue";
export default {
  name: "CreateGraph",
  setup() {
    const value = ref("");

    const options = [
      {
        value: "红楼梦",
        label: "红楼梦",
      },
      {
        value: "2024两会",
        label: "2024两会",
      },
     
    ];
    return{
        value,
        options,
    }
  },
};
</script>
    
<style>
.filenum{
    width: 100%;
    text-align: right;
}
.select{
    display: flex;
  justify-content: center;
  align-items: center;
}
</style>