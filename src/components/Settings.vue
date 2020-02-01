<template>
  <div id="settings" v-if="flag===1">
    <center>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="text item" v-if="identity!=='学院'">
          {{'姓名：' + userName}}
        </div>
        <div class="text item" v-else>
          {{'姓名：学院教务部门'}}
        </div>
        <div class="text item">
          {{'用户ID：' + userId}}
        </div>
      </el-card>
    </center>
    <el-button type="primary" @click="goNext">修改密码</el-button>
    <el-button type="danger" @click="logout">退出登录</el-button>
  </div>
  <div id="changePwd" v-else>
    <el-page-header @back="goBack" content="修改密码">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="8rem" class="form">
      <el-form-item label="新密码">
        <el-input v-model="form.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePwd">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      identity: '',
      userId: '',
      userName: '',
      flag: 1,
      form: {
        pwd: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    goNext () {
      this.flag = 2
    },
    goBack () {
      this.flag = 1
    },
    changePwd () {
      if (this.form.pwd !== this.form.confirmPwd) {
        this.$message({
          showClose: true,
          message: '2次输入的密码不一致！',
          type: 'error'
        })
      } else {
        var storage = window.localStorage
        this.$axios.get('http://127.0.0.1:8080/LeaveManager/changePwd', {
          params: {
            id: this.userId,
            pwd: this.form.pwd,
            identity: this.identity
          }
        }).then((res) => {
          if (res.data !== '') {
            storage.user = JSON.stringify(res.data)
          }
        }).catch((error) => {
          console.error(error)
        })
        this.$message({
          showClose: true,
          message: '修改成功！',
          type: 'success'
        })
      }
    },
    logout () {
      var storage = window.localStorage
      storage.clear()
      this.$router.push('/')
    }
  },
  created () {
    var storage = window.localStorage
    var user = JSON.parse(storage.user)
    this.identity = storage.identity
    if (this.identity === '学生') {
      this.userId = user.stu_id
    } else if (this.identity === '辅导员') {
      this.userId = user.tutor_id
    } else if (this.identity === '学院') {
      this.userId = user.edu_id
    } else {
      this.userId = user.teacher_id
    }
    this.userName = user.name
  }
}
</script>

<style scoped>
  #settings {
    text-align: center;
  }

  #changePwd {
    width: 30rem;
  }

  .form {
    margin-top: 1.5rem;
  }

  text {
    font-size: 1rem;
  }

  .item {
    margin-bottom: 1rem;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 30rem;
    margin-bottom: 1.5rem;
  }
</style>
