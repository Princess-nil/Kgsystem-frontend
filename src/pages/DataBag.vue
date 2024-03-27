<template>
  <div id="DataBag">
    <h1>当前位置：数据包</h1>
  </div>

  <div class="search">
    <el-input
      v-model="input"
      style="max-width: 600px"
      placeholder="请输入数据包名称"
    >
      <template #append>
        <el-button @click="search"><el-icon><search /></el-icon
        ></el-button>
      </template>
    </el-input>
    <!-- 数据包总数：{{ databagcnt }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    文件总数：{{ filecnt }} -->
  </div>

  <div class="newData">
    <el-icon size="40px"><FolderAdd /></el-icon>
    <el-button plain @click="dialogFormVisible = true">
      新建数据包
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="新建数据包" width="500px">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.dataname" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.datadescription" autocomplete="off"/>
        </el-form-item>

        <el-form-item v-if="showFormItem" label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.userid" autocomplete="off"/>
        </el-form-item>

        <el-form-item v-if="showFormItem" label="数据包id" :label-width="formLabelWidth">
          <el-input v-model="form.dataid" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitdatabag">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="dataname" label="数据包名称" width="260" align="center" />
        <el-table-column prop="datacount" label="文件数" width="80" align="center"/>
        <el-table-column prop="author.username" label="创建人" width="80" align="center"/>
        <el-table-column prop="createtime" label="创建日期" width="100" align="center"/>
        <el-table-column prop="datadescription" label="数据包描述" width="300" align="center"/>
      
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="edit(scope.$index)">
              修改
              </el-button>
            <el-button link type="primary" size="small" @click="uploadtxt(scope.$index)">
              上传
            </el-button>
            <el-button link type="primary" size="small" @click="deletedatabag(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </div>

    <el-dialog v-model="dialogFormVisibleEdit" width="500px">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.dataname" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.datadescription" autocomplete="off"/>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
          <el-button type="primary" @click="editdatabag">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisibleFile" title="文件管理">
      <template #title>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>文件管理</span>
          <div style="padding-top: 20px;">
            <el-upload
              class="inline-block"
              :action="$http.server_host+'/databag/uploadfile'"
              :data="{dataid:uploadingdataid}"
              name='file'
              :show-file-list="false"
              accept="file/txt"
              :on-success="onFileUploadSuccess"
              :on-error="onFileUploadError"
            >
            <el-button size="small" class='margin-change'>上传文件</el-button>
            </el-upload>
            <el-button size="small" @click="isDeleting = !isDeleting">选择删除</el-button>
          </div>
        </div>
      </template>
      <div class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <el-icon><Document /></el-icon>
          <span>{{ file.filename }}</span>
          <el-checkbox v-if="isDeleting" v-model="file.checked"></el-checkbox>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogFormVisibleFile = false">取消</el-button>
        <el-button v-if="isDeleting" type="danger" @click="deleteSelected">确认删除</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="deleteDialogVisible"
      title="提示"
      width="30%"
    >
      <span>您确定要删除这个数据包吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmdeletedatabag">确定</el-button>
        </span>
      </template>
    </el-dialog>
</template>
    
<script>
import {ElMessage} from "element-plus";
export default {
  name: "DataBag",
  data(){
    return{
      input:'',
      databagcnt:0,
      filecnt:0,
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleFile:false,
      isDeleting: false,
      showFormItem:false,
      deleteDialogVisible:false,
      editindex:0,
      deleteingIndex:0,
      uploadingindex:0,
      uploadingdataid:0,
      form:{
        dataname: "",
        datadescription: "",
        userid: "",
        dataid:""
      },
      tableData:[],
      files:[],
    }
  },
  mounted(){
    this.$http.getdatabagpage().then(result =>{
      let res = result['data'];
      if(res['code'] == 200){
        let d = res['data']
        this.tableData = d['d_list']
      }else{
        ElMessage.error(res['message']);
      }
    })
  },
  methods:{
    deleteSelected(){
      let ans = []
      for (let i = 0; i < this.files.length; i++) {
        if(this.files[i].checked){
          ans.push(this.files[i].fileid)
        }
      }
      this.$http.deletefiles(ans).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          this.files = res['data']['files']
          ElMessage.success("文件删除成功！")
        }else{
          ElMessage.error(res['message'])
        }
      })
    },
    uploadtxt(index){
      this.dialogFormVisibleFile = true
      this.uploadingindex = index
      this.uploadingdataid = this.tableData[index].dataid
      this.$http.getfiles(this.uploadingdataid).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          this.files = res['data']['files']
        }
      })
    },
    onFileUploadSuccess(res){
      if(res['code'] == 200){
        this.files = res['data']['files']
        ElMessage.success("文件添加成功！")
      }else{
        ElMessage.error(res['message'])
      }
    },
    onFileUploadError(){

    },
    search(){
      this.$http.Search(this.input).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          this.tableData = res['data']['databag_list']
        }else{
          ElMessage.error(res['message']);
        }
        
      })
    },
    submitdatabag(){
      this.form.userid = JSON.parse(localStorage.getItem("USER_KEY")).userid
      console.log(JSON.parse(localStorage.getItem("USER_KEY")).userid)
      this.$http.submitdatabagevent(this.form).then(result=>{
          let res = result['data']
          if(res['code'] == 200){
            let x = res['data']
            this.tableData.push(x)
            ElMessage.success("数据包添加成功！")
            this.dialogFormVisible = false
            this.databagcnt += 1
          }else{
            ElMessage.error(res['message'])
          }
      }).catch(() => {
            ElMessage.error("服务器开小差了，请稍后再试！");
            this.bannerDialogVisible = false
      })
    },
    edit(index){
      this.editindex = index
      this.dialogFormVisibleEdit = true
      let x = this.tableData[index]
      this.form.datadescription = x.datadescription
      this.form.dataname = x.dataname
      this.form.userid = JSON.parse(localStorage.getItem("USER_KEY")).userid
      this.form.dataid = x.dataid
    },
    editdatabag(){
      this.$http.editdatabag(this.form).then(result=>{
        let res = result['data']
        if(res['code'] == 200){
          let x = res['data']
          this.tableData.splice(this.editindex, 1, x)
          ElMessage.success("数据包编辑成功！");
          this.dialogFormVisibleEdit = false
        }else{
          ElMessage.error(res['message'])
        }
      })
    },
    deletedatabag(index){
      this.deleteingIndex = index;
      this.deleteDialogVisible = true;
    },
    onConfirmdeletedatabag(){
      let x = this.tableData[this.deleteingIndex]
      this.$http.deleteDatabag(x.dataid).then(res => {
        let result = res['data'];
        let code = result['code'];
        if(code === 200){
          this.deleteDialogVisible = false;
          this.tableData.splice(this.deleteingIndex, 1);
          ElMessage.success("图谱删除成功！");
        }else{
          ElMessage.error(result['message']);
        }
      })
    }
  },
  setup() {

    const formLabelWidth = "140px";




    return {
      formLabelWidth,
    };
  },
};
</script>
    
<style>
.search {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.newData{
  display: flex;
  justify-content: center;
  align-items: center;
}

.table{
  margin-top: 30px;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
}
.file-item {
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  
}
.inline-block {
  display: inline-block;
  margin-right:10px; 
}
.margin-change{
  display: inline-block;
  margin-left:10px;
}

</style>