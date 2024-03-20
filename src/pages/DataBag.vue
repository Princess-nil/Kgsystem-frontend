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
        <el-button
          ><el-icon><search /></el-icon
        ></el-button>
      </template>
    </el-input>
    数据包总数：{{ 3 }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    文件总数：{{ 1000 }}
  </div>

  <div class="newData">
    <el-icon size="40px"><FolderAdd /></el-icon>
    <el-button plain @click="dialogFormVisible = true">
      新建数据包
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="新建数据包" width="500px">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off"/>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="数据包名称" width="260" align="center" />
        <el-table-column prop="num" label="文件数" width="80" align="center"/>
        <el-table-column prop="creator" label="创建人" width="80" align="center"/>
        <el-table-column prop="data" label="创建日期" width="100" align="center"/>
        <el-table-column prop="describe" label="数据包描述" width="300" align="center"/>
      
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template #default>
            <el-button link type="primary" size="small" @click="dialogFormVisibleEdit = true">
              修改
              </el-button>
            <el-button link type="primary" size="small" @click="dialogFormVisibleFile = true">
              上传
            </el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogFormVisibleEdit" width="500px">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off"/>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisibleEdit = false">
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
            <el-button size="small">上传文件</el-button>
            <el-button size="small" @click="isDeleting = !isDeleting">选择删除</el-button>
          </div>
        </div>
      </template>
      <div class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <el-icon><Document /></el-icon>
          <span>{{ file.name }}</span>
          <el-checkbox v-if="isDeleting" v-model="file.checked"></el-checkbox>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogFormVisibleFile = false">取消</el-button>
        <el-button v-if="isDeleting" type="danger" @click="deleteSelected">确认删除</el-button>
      </template>
    </el-dialog>
</template>
    
<script>
import { reactive, ref } from "vue";
export default {
  name: "DataBag",

  setup() {
    const dialogFormVisible = ref(false);
    const dialogFormVisibleEdit = ref(false);
    const dialogFormVisibleFile = ref(false);
    const isDeleting = ref(false);

    const formLabelWidth = "140px";
    const form = reactive({
      name: "",
      describe:"",
    });

    const tableData = ref([
      {
        name: '红楼梦',
        num: '1000',
        creator: '张三',
        data: '2024-3-18',
        describe: '红楼梦xxxxxxxxxxxxxxxxxxxxxx',
      },
      {
        name: '红楼梦',
        num: '1000',
        creator: '张三',
        data: '2024-3-18',
        describe: '红楼梦xxxxxxxxxxxxxxxxxxxxxxx',
      },
    ]);

    const files = ref([
      { name: 'file1.png', checked: false },
      { name: 'file2.png', checked: false },
    ]);

    const deleteSelected = () => {
      files.value = files.value.filter(file => !file.checked);
      isDeleting.value = false; 
    };

    return {
      dialogFormVisible,
      formLabelWidth,
      form,
      tableData,
      dialogFormVisibleEdit,
      dialogFormVisibleFile,
      isDeleting,
      files,
      deleteSelected,
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
</style>