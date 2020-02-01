<template>
  <div id="index">
    <el-container>
      <el-header>
        <span id="title"><i class="el-icon-s-promotion"></i>学 生 请 假 管 理 系 统</span>
      </el-header>
      <el-container>
        <el-aside width="11rem">
          <el-menu router default-active="defaultRouter" class="el-menu-vertical-demo">
            <el-menu-item index="/home">
              <i class="el-icon-s-order"></i>
              <span slot="title" v-if="identity==='学生'">历史请假记录</span>
              <span slot="title" v-else>审核请假申请</span>
            </el-menu-item>
            <el-menu-item index="/vacate" v-if="identity==='学生'">
              <i class="el-icon-edit"></i>
              <span slot="title">我要请假</span>
            </el-menu-item>
            <el-menu-item index="/analysis" v-if="identity==='学院'">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
            <el-menu-item index="/fileupload" v-if="identity==='学院'">
              <i class="el-icon-upload"></i>
              <span slot="title">Excel导入</span>
            </el-menu-item>
            <el-menu-item index="/settings">
              <i class="el-icon-setting"></i>
              <span slot="title">用户设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultRouter: '/home',
      identity: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    var storage = window.localStorage
    if (storage.getItem('user') !== null) {
      next()
    } else {
      next('/')
    }
  },
  created () {
    var storage = window.localStorage
    this.identity = storage.identity
  }
}
</script>

<style scoped>
  .el-header {
    position: fixed;
    left: 0;
    right: 0;
    background-color: #545C64;
    color: #DDD;
    text-align: center;
    line-height: 3.75rem;
  }

  .el-aside {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    background-color: #F8F8F8;
    color: #FFF;
    text-align: left;
    line-height: 200px;
    height: calc(100vh - 3.75rem);
  }

  .el-main {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    left: 11rem;
    right: 0;
    overflow: scroll;
    overflow-x: hidden;
    background-color: #FBFBFB;
    color: #333;
    text-align: center;
  }

  #title {
    float: left;
    font-size: 1.2rem;
  }

  #title i {
    font-size: 1.5rem;
    padding-right: 1rem;
  }
</style>
