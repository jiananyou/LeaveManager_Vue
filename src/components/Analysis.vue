<template>
  <div id="Analysis">
    <el-row type="flex" class="margin-top" justify="space-around">
      <el-col :span="9">
        <div class="grid-content">
          <el-card class="pie">
            <ve-pie :data="chartData"></ve-pie>
            <span class="chartName">请假类型分布(饼图)</span>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-card class="histogram">
            <ve-histogram :data="chartData"></ve-histogram>
            <span class="chartName">请假类型分布(柱状图)</span>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartData: {
        columns: ['请假类型', '出现次数'],
        rows: []
      }
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8080/LeaveManager/edu/analysis', {
    }).then((res) => {
      if (res.data !== '') {
        console.log(res.data)
        this.chartData.rows = [{
          '请假类型': '病假',
          '出现次数': res.data[0]
        }, {
          '请假类型': '事假',
          '出现次数': res.data[1]
        }, {
          '请假类型': '学院辅助工作',
          '出现次数': res.data[2]
        }, {
          '请假类型': '其他',
          '出现次数': res.data[3]
        }]
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
</script>

<style scoped>
  .margin-top {
    margin-top: 1rem;
  }

  .chartName {
    font-size: 1.2rem;
  }
</style>
