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
      @change="changegraph"
    >
      <el-option
        v-for="item in options"
        :key="item.dataname"
        :label="item.dataname"
        :value="item.dataid"
      />
    </el-select>
  </div>

  <!-- <div class="filenum">
    文件总数：
    {{ 23 }}
  </div> -->
  <div class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <el-icon size="100px"><Document /></el-icon>
          <span>{{ file.filename }}</span>
        </div>
  </div>
  <div>
    <el-button type="primary" v-if="value" class="right-button" @click="extract">抽取</el-button>
</div>
<div class="table" v-if="tableData.length>0" >
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="head" label="head" width="300" align="center" />
    <el-table-column prop="relation" label="relation" width="300" align="center"/>
    <el-table-column prop="tail" label="tail" width="300" align="center"/>
    </el-table>
    <el-button type="primary" class="right-button" @click="dialogFormVisibleEdit=true">提交</el-button>
</div>
<el-dialog v-model="dialogFormVisibleEdit" width="500px">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.graphname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.graphdescription" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
          <el-button type="primary" @click="submitgraph">
            提交
          </el-button>
        </div>
      </template>
  </el-dialog>
    
</template>
    
<script>
import { ElMessage } from 'element-plus'
import router from '@/router'
export default {
  name: "CreateGraph",
  mounted(){
    this.$http.creategrap().then(result=>{
      let res = result['data']
      if(res['code'] == 200){
        console.log(res)
        this.options = res['data']['dataset']
      }
    })
  },
  methods:{
    submitgraph(){
      this.$http.submitgraphEvent(this.form).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          ElMessage.success("提交成功! ")
          router.push('/')
        }
      })
    },
    changegraph(v) {
      this.$http.getfilename(v).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          this.files = res['data']['files']
        }
      })
    },
    extract(){
      let x = []
      for(let i = 0; i < this.files.length; i ++ ){
        x.push(this.files[i].fileid)
      }
      this.$http.extractThree(x).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          this.tableData = res['data']['list']
          ElMessage.success("抽取成功! ")
        }
      })
    }
  },
  data(){
    return {
      files:[],
      options:[],
      tableData:[],
      value:"",
      dialogFormVisibleEdit:false,
      form:[{
        graphname:"",
        graphdescription:""
      }]
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
.right-button {
  position: absolute;
    right: 100px;
}
</style>