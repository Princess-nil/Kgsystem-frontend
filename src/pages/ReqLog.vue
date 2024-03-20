<template>
  <div id="ReqLog">
    <h1>当前位置：请求日志</h1>
  </div>

  <div class="search">
    <div>
      <el-input v-model="input" style="max-width: 600px" placeholder="">
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
    </div>
  </div>

  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="用户"
        width="150"
        align="center"
      />
      <el-table-column prop="ip" label="IP" width="150" align="center" />
      <el-table-column prop="req" label="请求数据" width="150" align="center" />
      <el-table-column prop="res" label="响应数据" width="150" align="center" />
      <el-table-column
        prop="type"
        label="请求类型"
        width="150"
        align="center"
      />
      <el-table-column
        prop="time"
        label="请求时间"
        width="150"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template #default>
          <el-button link type="primary" size="small" @click="dialogVisible = true"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="请求日志详情"
      width="70%"
    >
      <span>请求日志内容</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
    
  <script>
import { ref } from "vue";
export default {
  name: "ReqLog",
  setup() {
    const dialogVisible = ref(false);

    const tableData = ref([
      {
        name: "zzy",
        ip: "127.0.0.1",
        req: "xxxxx",
        res: "xxxxx",
        type: "xxxxxxxxx",
        tiem: "xxxxxxxxxxx",
      },
      {
        name: "zzy",
        ip: "127.0.0.1",
        req: "xxxxx",
        res: "xxxxx",
        type: "xxxxxxxxx",
        tiem: "xxxxxxxxxxx",
      },
    ]);

    return {
      dialogVisible,
      tableData,
    };
  },
};
</script>
    
<style>
</style>