<template>
  <el-container class="login-container">
    <el-main class="login-main">
      <h1 class="login-title">登录</h1>
      <el-form class="login-form">
        <el-form-item>
          <el-input v-model="username" placeholder="请输入用户名" prefix-icon="user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" placeholder="请输入密码" prefix-icon="lock" show-password></el-input>
        </el-form-item>
        <div class="login-actions">
          <el-button type="primary">登录</el-button>
          <el-button @click="navigateToRegister">注册</el-button>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data(){
    return{
      username:"",
      password:"",
    }

  },
  methods: {
    navigateToRegister() {
      this.$router.push('/Register');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-main {
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
