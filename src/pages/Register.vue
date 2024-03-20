<template>
    <el-container class="register-container">
      <el-main class="register-main">
        <h1 class="register-title">注册</h1>
        <el-form class="register-form">
          <el-form-item>
            <el-input v-model="phone" placeholder="请输入手机号" prefix-icon="phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" placeholder="请输入密码" prefix-icon="lock" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="re_password" placeholder="请再次输入密码" prefix-icon="lock" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="capicha" placeholder="请输入短信验证码" prefix-icon="message" style="width: 245px;"></el-input>
            <el-button type="primary">获取验证码</el-button>
          </el-form-item>
          <div class="register-actions" style="display: flex;justify-content: center; align-items: center;">
            <el-button type="primary" style="width: 200px;">注册</el-button>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data(){
      return{
        username:"",
        password:"",
        re_password:"",
      }
  
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .register-main {
    width: 100%;
    max-width: 400px;
  }
  
  .register-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
  }
  
  .register-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  