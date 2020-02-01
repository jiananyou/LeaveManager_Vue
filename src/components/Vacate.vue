<template>
  <div id="vacate">
    <center>
      <el-form ref="vacateForm" :model="vacateForm" label-width="5rem" id="vacateForm">
        <el-form-item label="学号">
          <el-input v-model="vacateForm.stu_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="vacateForm.start_time" style="width: 100%;" format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd" @change="dateChange"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="vacateForm.end_time" style="width: 100%;" format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd" @change="dateChange"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="请假类型" class="left">
          <el-select v-model="vacateForm.type" placeholder="请选择请假类型">
            <el-option label="事假" value="事假"></el-option>
            <el-option label="病假" value="病假"></el-option>
            <el-option label="学院学生辅助工作" value="学院学生辅助工作"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请假原因" v-if="vacateForm.type==='其他'">
          <el-input v-model="vacateForm.result"></el-input>
        </el-form-item>
        <el-form-item label="课程清单" class="left">
          <el-tag type="warning" v-for="course in courseList" :key="course" class="margin-right">{{course}}</el-tag>
          <el-tag type="info" v-if="courseList.length===0">暂无</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </center>
  </div>
</template>

<script>
export default {
  data () {
    return {
      vacateForm: {
        stu_id: '',
        start_time: '',
        end_time: '',
        type: '',
        result: ''
      },
      courseList: []
    }
  },
  methods: {
    dateChange () {
      var startTime = this.vacateForm.start_time
      var endTime = this.vacateForm.end_time
      var storage = window.localStorage
      var user = JSON.parse(storage.user)
      var courseList = user.course_list
      if (endTime < startTime) {
        this.$message({
          showClose: true,
          message: '结束时间应晚于开始时间',
          type: 'error'
        })
      } else {
        if (startTime !== '' && endTime !== '') {
          this.$axios.get('http://127.0.0.1:8080/LeaveManager/student/find_course', {
            params: {
              start_time: startTime,
              end_time: endTime,
              course_list: courseList
            }
          }).then((res) => {
            if (res.data !== '') {
              this.courseList = res.data
            }
          }).catch((error) => {
            console.error(error)
          })
        }
      }
    },
    onSubmit () {
      var storage = window.localStorage
      var user = JSON.parse(storage.user)
      var courseList = JSON.stringify(this.courseList)
      if (this.vacateForm.start_time === '' || this.vacateForm.end_time === '' || this.vacateForm.type === '') {
        this.$message({
          showClose: true,
          message: '表单信息未填写完整！',
          type: 'error'
        })
      } else {
        this.$axios.get('http://127.0.0.1:8080/LeaveManager/student/add_vacate', {
          params: {
            id: this.vacateForm.stu_id,
            stu_name: user.name,
            grade_id: user.grade_id,
            submit_time: this.getNowFormatDate(),
            start_time: this.vacateForm.start_time,
            end_time: this.vacateForm.end_time,
            type: this.vacateForm.type,
            result: this.vacateForm.result,
            course_list: courseList.substring(1, courseList.length - 1)
          }
        }).then((res) => {
          if (res.data !== '') {
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
            this.vacateForm.start_time = ''
            this.vacateForm.end_time = ''
            this.vacateForm.type = ''
            this.vacateForm.result = ''
            this.courseList = []
          }
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  },
  created () {
    var storage = window.localStorage
    var user = JSON.parse(storage.user)
    this.vacateForm.stu_id = user.stu_id
  }
}
</script>

<style scoped>
  #vacateForm {
    width: 35rem;
  }

  .el-tag {
    font-size: 1rem;
  }

  .left {
    text-align: left;
  }

  .margin-right {
    margin-right: 1rem;
  }
</style>
