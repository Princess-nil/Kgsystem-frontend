<template>
  <el-container class="login-container">
    <el-main class="login-main">
      <h1 class="login-title">登录</h1>
      <el-form class="login-form" :model="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="user"></el-input>
        </el-form-item>
        <el-form-item prop="userpwd">
          <el-input v-model="form.userpwd" placeholder="请输入密码" prefix-icon="lock" show-password></el-input>
        </el-form-item>
        <div class="login-actions">
          <el-button type="primary" @click="Login">登录</el-button>
          <el-button @click="navigateToRegister">注册</el-button>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import qs from "qs"
import { ajax } from '@/utils/axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

export default {
  name: 'LoginPage',
  data(){
    return{
     form: {
        username: '',
        userpwd: ''
      }
    }

  },
  methods: {
    navigateToRegister() {
      this.$router.push('/Register');
    },
    Login() {
      ajax.post("http://127.0.0.1:5000/login",
        qs.stringify(this.form)
      ).then((result) => {
          let res = result['data'];
          let code = res['code'];
          if(code === 200){
              let token = res['data']['token'];
              let user = res['data']['user'];
              this.$auth.clearUserToken();
              this.$auth.setUserToken(user, token);
              ElMessage.success('登录成功!');
              router.push('/');
          }else{
            ElMessage.error(res['message']);
          }
        })
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
