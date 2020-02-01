<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: auto;
  }

  [class*=" el-icon-"], [class^=el-icon-] {
    vertical-align: middle;
  }

  .el-table__column-filter-trigger i {
    font-size: 1.8rem;
    font-weight: bold;
  }

  .el-table__expand-icon {
    font-size: 1rem;
    font-weight: bold;
  }

  .el-table__expanded-cell[class*=cell] {
    padding: 1.2rem 15rem;
  }

  .el-form-item__label {
    min-width: 5rem;
    font-weight: bold;
  }

  .el-table__row {
    height: 3.7rem;
    line-height: 3.7rem;
  }
</style>
