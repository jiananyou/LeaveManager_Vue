<template>
  <div id="login">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="loginForm">
      <div id="title">用户登录</div>
      <el-form-item prop="uid">
        <el-input v-model="loginForm.uid" autocomplete="off" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="loginForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="selected" placeholder="请选择身份">
          <el-option v-for="item in identityList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var checkUid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户ID'))
      } else {
        callback()
      }
    }
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      identityList: ['学生', '辅导员', '学院', '老师'],
      selected: '',
      loginForm: {
        uid: '',
        pwd: ''
      },
      rules: {
        uid: [{
          validator: checkUid,
          trigger: 'blur'
        }],
        pwd: [{
          validator: checkPwd,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.get('http://127.0.0.1:8080/LeaveManager/login', {
            params: {
              id: this.loginForm.uid,
              pwd: this.loginForm.pwd,
              identity: this.selected
            }
          }).then((res) => {
            if (res.data !== '') {
              console.log(res.data)
              var storage = window.localStorage
              storage.identity = this.selected
              storage.user = JSON.stringify(res.data)
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success'
              })
              this.$router.push('index')
            } else {
              this.$message({
                showClose: true,
                message: '用户名或密码错误',
                type: 'error'
              })
            }
          }).catch((error) => {
            console.error(error)
          })
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    var storage = window.localStorage
    if (storage.getItem('user') !== null) {
      next('/home')
    } else {
      next()
    }
  }
}
</script>

<style scoped>
  #login {
    background-image: url(../assets/index.jpg);
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .loginForm {
    width: 20rem;
    height: 20rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  #title {
    margin-top: 2rem;
    margin-bottom: 2rem;
    color: #ddd;
    font-size: 2rem;
  }

  .el-button {
    width: 20rem;
  }

  .el-select {
    width: 100%;
  }
</style>
