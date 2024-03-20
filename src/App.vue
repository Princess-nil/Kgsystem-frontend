<template>
  <div class="frame">
    <el-container class="frame-container" v-if="!isAuthPage">
      <el-header class="header">
        <a href="/" class="brand"><strong>时空知识图谱系统</strong></a>
        <div class="header-content"></div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-row class="menu-row">
            <el-col :span="24">
              <el-menu
                default-active="1"
                background-color="#545c64"
                active-text-color="#fff"
                text-color="#ddd"
                :router="true"
              >
                <el-menu-item index="1" :route="{ name: 'home' }">
                  <template #title>
                    <el-icon><House /></el-icon>
                    <span>首页</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="2" :route="{ name: 'DataBag' }">
                  <template #title>
                    <el-icon><DataAnalysis /></el-icon>
                    <span>数据包</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="3" :route="{ name: 'CreateGraph' }">
                  <template #title>
                    <el-icon><Share /></el-icon>
                    <span>构建图谱</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="4" :route="{ name: 'Extraction' }">
                  <template #title>
                    <el-icon><DocumentCopy /></el-icon>
                    <span>知识抽取</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="5" :route="{ name: 'KgUnion' }">
                  <template #title>
                    <el-icon><Connection /></el-icon>
                    <span>知识融合</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="6" :route="{ name: 'ReqLog' }">
                  <template #title>
                    <el-icon><Phone /></el-icon>
                    <span>请求日志</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="7" @click="logout">
                  <template #title>
                    <el-icon><CloseBold /></el-icon>
                    <span>安全退出</span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <router-view v-if="isAuthPage"></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  computed: {
    isAuthPage() {
      return this.$route.name === 'Login' || this.$route.name === 'Register';
    }
  },
  methods: {
    logout() {
      this.$router.push("/Login"); 
    },
  },
};
</script>

<style scoped>
.frame-container {
  height: 100vh;
}
.header {
  height: 90px;
  display: flex;
}

.header .brand {
  width: 200px;
  margin-left: -20px;
  background-color: #545c64;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header .header-content {
  background-image: url("./assets/u32.png");
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -20px;
}

.header-content .signout {
  cursor: pointer;
}

.aside {
  background-color: #545c64;
}

.aside .el-menu .is-active {
  background-color: #434a50 !important;
}

.footer {
  background: gray;
}
</style>

<style scoped>
.el-menu {
  border-right: none;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  text-decoration: none;
  vertical-align: baseline;
}
</style>