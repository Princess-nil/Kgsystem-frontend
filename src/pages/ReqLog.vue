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
        prop="author.username"
        label="用户"
        width="150"
        align="center"
      />
      <el-table-column prop="ip" label="IP" width="150" align="center" />
      <el-table-column prop="request" label="请求数据" width="150" align="center" />
      <el-table-column prop="response" :formatter="stateFormat" label="响应数据" width="150" align="center" />
      <el-table-column
        prop="type"
        label="请求类型"
        width="150"
        align="center"
      />
      <el-table-column
        prop="request_time"
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
      <span>{{this.tableData[0]['response']}}</span>
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
  data(){
    return{
      tableData:[]
    }
  },
  mounted(){
    this.$http.getlog().then(result=>{
      let res = result['data']
      if(res['code'] == 200){
        this.tableData = res['data']['logs']

      }
    })
  },

methods:{
   stateFormat(row, column, cellValue) {
    if (!cellValue) return ''
    if (cellValue.length > 10) {       //最长固定显示10个字符
      return cellValue.slice(0, 10) + '...'
    }
    return cellValue
  },
},
  setup() {
    const dialogVisible = ref(false);

    

    return {
      dialogVisible,
    };
  },
};
</script>
    
<style>
</style>