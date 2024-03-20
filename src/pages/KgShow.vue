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
    <div id="main" style="width: 600px;height:400px;" ></div>

  </div>
</template>
  
  <script>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

export default {
  name: "KgShow",

  setup() {
    const radio = ref("");
    const input = ref("");
    const select = ref("");

    onMounted(() => {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "这里放入neo4j模组",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: [
              {
                name: "Node 1",
                x: 300,
                y: 300,
              },
              {
                name: "Node 2",
                x: 800,
                y: 300,
              },
              {
                name: "Node 3",
                x: 550,
                y: 100,
              },
              {
                name: "Node 4",
                x: 550,
                y: 500,
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                lineStyle: {
                  curveness: 0.2,
                },
              },
              {
                source: "Node 2",
                target: "Node 1",
                lineStyle: {
                  curveness: 0.2,
                },
              },
              {
                source: "Node 1",
                target: "Node 3",
              },
              {
                source: "Node 2",
                target: "Node 3",
              },
              {
                source: "Node 2",
                target: "Node 4",
              },
              {
                source: "Node 1",
                target: "Node 4",
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };

      option && myChart.setOption(option);
    });

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