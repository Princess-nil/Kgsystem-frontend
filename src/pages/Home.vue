<template>
  <div id="home">
    <h1>当前位置：首页</h1>
    <div class="states">
      <el-row :gutter="40">
        <el-col :span="6" class="image-container"
          ><div class="grid-content" />
          <el-image
            style="width: 40%; height: auto; display: block; margin: auto"
            :src="require('@/assets/database.svg')"
          />
          <div>
            <b>知识图谱总数</b>
          </div>
          <div>{{ graphcnt }}</div>
        </el-col>
        <el-col :span="6" class="image-container"
          ><div class="grid-content" />
          <el-image
            style="width: 40%; height: auto; display: block; margin: auto"
            :src="require('@/assets/item.svg')"
          />
          <div>
            <b>实体总数</b>
          </div>
          <div>{{ entitycnt }}</div>
        </el-col>
        <el-col :span="6" class="image-container"
          ><div class="grid-content" />
          <el-image
            style="width: 40%; height: auto; display: block; margin: auto"
            :src="require('@/assets/relation.svg')"
          />
          <div>
            <b>关系总数</b>
          </div>
          <div>{{ linkcnt }}</div>
        </el-col>
        <el-col :span="6" class="image-container"
          ><div class="grid-content" />
          <el-image
            style="width: 40%; height: auto; display: block; margin: auto"
            :src="require('@/assets/event.svg')"
          />
          <div>
            <b>事件总数</b>
          </div>
          <div>{{ eventcnt }}</div>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="graphname" label="知识图谱名称" width="260" align="center" />
        <el-table-column prop="entitycount" label="实体数" width="80" align="center"/>
        <el-table-column prop="linkcount" label="关系数" width="80" align="center"/>
        <el-table-column prop="eventcount" label="事件数" width="80" align="center"/>
        <el-table-column prop="graphdescription" label="知识图谱描述" width="300" align="center"/>
      
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleClick"
              >查看</el-button
            >
            <el-button link type="primary" size="small" @click="Deletegraph(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog
      v-model="deleteDialogVisible"
      title="提示"
      width="30%"
    >
      <span>您确定要删除这个图谱吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmDeleteEvent">确定</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
export default {
  name: "HomePage",
  data(){
    return {
      deleteDialogVisible: false,
      deleteingIndex: 0,
      graphcnt: 0,
      entitycnt: 0,
      linkcnt: 0,
      eventcnt: 0,
      tableData: [],
    }
  },
  mounted(){
    this.$http.gethomepage().then(result =>{
      let res = result['data']
      if(res['code'] == 200){

        let d = res['data']
        this.graphcnt = d['graphcnt']['gpcount']
        this.entitycnt = d['graphcnt']['entitycount']
        this.linkcnt = d['graphcnt']['linkcount']
        this.eventcnt = d['graphcnt']['eventcount']
        this.tableData = d['graphs']
      }else{
        ElMessage.error(res['message']);
      }
    })
  },
  setup() {
    const router = useRouter();
    const handleClick = () => {
      console.log('click');
      router.push('/KgShow');
    };

    return {
      handleClick
    };
  },
  methods:{
    Deletegraph(index){
      this.deleteingIndex = index;
      this.deleteDialogVisible = true;
    },
    onConfirmDeleteEvent(){
      let x = this.tableData[this.deleteingIndex];
      this.$http.deleteGraph(x.graphid).then(res => {
        let result = res['data'];
        let code = result['code'];
        if(code === 200){
          this.deleteDialogVisible = false;
          this.tableData.splice(this.deleteingIndex, 1);
          ElMessage.success("图谱删除成功！");
          window.location.reload();
        }else{
          ElMessage.error(result['message']);
        }
      })
    }
  }
};
</script>

<style>

.states .el-row {
  margin-bottom: 20px;
}
.states .el-row:last-child {
  margin-bottom: 0;
}
.states .el-col {
  border-radius: 4px;
}

.states .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.states .image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table{
  margin-top: 30px;
}
</style>