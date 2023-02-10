<template>
  <div class="login">
    <div class="login-form">
      <h1>用户管理系统</h1>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="
           {
            max-width: 460px;
          }
        ">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formLabelAlign.username" autofocus="true" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formLabelAlign.password" show-password />
        </el-form-item>
        <p class="register">
          <router-link to="/register">没有账号,去注册</router-link>
        </p>
        <el-button type="primary" style="width: 100px; margin-left: 160px; margin-top: 20px"
          @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginApi } from "../api/api.js";
export default {
  data() {
    return {
      formLabelAlign: { username: "", password: "" },
    };
  },
  methods: {
    async login() {
      loginApi(this.formLabelAlign).then((res) => {
        const { data } = res;
        console.log(data);
        if (res.status === 200) {
          ElMessage({
            message: data.message,
            type: "success",
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("uname", data.username);
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;
  background: url("../assets/login.jpg") no-repeat center;
  background-size: cover;
  font-size: 20px;
  color: #000;
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 40px;
    text-align: center;
    margin-bottom: 30px;
    margin-left: 100px;
  }

  .register {
    display: flex;
    justify-content: flex-end;

    a {
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
