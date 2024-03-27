<template>
  <div>
    <h1>当前位置：图谱展示</h1>
  </div>
  <div class="search">
      <el-input
        v-model="input"
        style="max-width: 600px"
        placeholder=""
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="全部" style="width: 115px">
            <el-option label="全部" value="1" />
            <el-option label="事件" value="2" />
            <el-option label="实体" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button
            ><el-icon><search /></el-icon
          ></el-button>
        </template>
      </el-input>

      <el-radio-group v-model="radio" size="small" style="padding-top: 20px;">
        <el-radio-button label="实例层" value="item" />
        <el-radio-button label="知识层" value="Kg" />
        <el-radio-button label="数据层" value="Datas" />
      </el-radio-group>
  </div>
 
  <div class="relation">
    <div id="main" style="width: 1300px;height:600px;" >
      <router-view></router-view>
    </div>

  </div>
</template>
  
  <script>
import {ref } from "vue";

export default {
  name: "KgShow",

  setup() {
    const radio = ref("");
    const input = ref("");
    const select = ref("");

    

    return {
      radio,
      input,
      select,
    };
  },
};
</script>
  
<style>
.input-with-select {
  padding-left: 20px;
}
.relation{
    margin: 40px;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>