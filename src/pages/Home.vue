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
          <div>{{ 15 }}</div>
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
          <div>{{ 54645 }}</div>
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
          <div>{{ 456465 }}</div>
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
          <div>{{ 4884 }}</div>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="知识图谱名称" width="260" align="center" />
        <el-table-column prop="item" label="实体数" width="80" align="center"/>
        <el-table-column prop="relation" label="关系数" width="80" align="center"/>
        <el-table-column prop="event" label="事件数" width="80" align="center"/>
        <el-table-column prop="describe" label="知识图谱描述" width="300" align="center"/>
      
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
              >查看</el-button
            >
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: "HomePage",
  setup() {
    const router = useRouter();
    const handleClick = () => {
      console.log('click');
      router.push('/KgShow');
    };

    const tableData = ref([
      {
        name: '武器装备知识图谱',
        item: '456',
        relation: '53',
        event: '20',
        describe: '这是一个关于全球海陆空武器装备的知识..',
      },
      {
        name: '武器装备知识图谱',
        item: '456',
        relation: '53',
        event: '20',
        describe: '这是一个关于全球海陆空武器装备的知识..',
      },
    ]);

    return {
      handleClick,
      tableData
    };
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