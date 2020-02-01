<template>
  <div id="home">
    <div id="search">
      <el-tabs @tab-click="tabClick">
        <el-tab-pane label="按时间段查询">
          <el-form :inline="true" :model="searchByTime" class="demo-form-inline">
            <el-form-item label="开始时间">
              <el-date-picker v-model="searchByTime.start_time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="searchByTime.end_time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="按学期查询">
          <el-form :inline="true" :model="searchByTerm" class="demo-form-inline">
            <el-form-item label="学期">
              <el-select v-model="searchByTerm.term" placeholder="请选择学期">
                <el-option label="2017-2018-2" value="2017-2018-2"></el-option>
                <el-option label="2018-2019-1" value="2018-2019-1"></el-option>
                <el-option label="2018-2019-2" value="2018-2019-2"></el-option>
                <el-option label="2019-2020-1" value="2019-2020-1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="按类型查询">
          <el-form :inline="true" :model="searchByType" class="demo-form-inline">
            <el-form-item label="类型">
              <el-select v-model="searchByType.type" placeholder="请选择类型">
                <el-option label="病假" value="病假"></el-option>
                <el-option label="事假" value="事假"></el-option>
                <el-option label="学院学生辅助工作" value="学院学生辅助工作"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <template v-if="identity===0">
              <template v-if="props.row.status===-1">
                <el-steps :active="props.row.step-1" process-status="error" finish-status="success" align-center>
                  <el-step title="辅导员"></el-step>
                  <el-step title="学院教务部门"></el-step>
                  <el-step title="老师"></el-step>
                </el-steps>
              </template>
              <template v-else-if="props.row.status===1">
                <el-steps :active="3" process-status="success" finish-status="success" align-center>
                  <el-step title="辅导员"></el-step>
                  <el-step title="学院教务部门"></el-step>
                  <el-step title="老师"></el-step>
                </el-steps>
              </template>
              <template v-else>
                <el-steps :active="props.row.step-1" process-status="process" finish-status="success" align-center>
                  <el-step title="辅导员"></el-step>
                  <el-step title="学院教务部门"></el-step>
                  <el-step title="老师"></el-step>
                </el-steps>
              </template>
            </template>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="学生ID">
                <span>{{ props.row.stu_id }}</span>
              </el-form-item>
              <el-form-item label="请假单号">
                <span>{{ props.row.vacate_id }}</span>
              </el-form-item>
              <el-form-item label="学生姓名">
                <span>{{ props.row.stu_name }}</span>
              </el-form-item>
              <el-form-item label="学期">
                <span>{{ props.row.term }}</span>
              </el-form-item>
              <el-form-item label="提交时间">
                <span>{{ props.row.submit_time }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span>{{ props.row.start_time }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{ props.row.end_time }}</span>
              </el-form-item>
              <el-form-item label="请假天数">
                <span>{{ props.row.period }}</span>
              </el-form-item>
              <el-form-item label="请假类型">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="请假原因">
                <span>{{ props.row.result }}</span>
              </el-form-item>
              <el-form-item label="课程列表">
                <span>{{ props.row.course_list }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column width="110" label="学号" prop="stu_id" align="center">
        </el-table-column>
        <el-table-column width="110" label="姓名" prop="stu_name" align="center">
        </el-table-column>
        <el-table-column width="170" label="学期" prop="term" align="center">
        </el-table-column>
        <el-table-column width="200" label="提交时间" prop="submit_time" align="center">
        </el-table-column>
        <el-table-column width="150" label="开始时间" prop="start_time" align="center">
        </el-table-column>
        <el-table-column width="150" label="结束时间" prop="end_time" align="center">
        </el-table-column>
        <el-table-column width="140" label="类型" prop="type" align="center">
        </el-table-column>
        <el-table-column label="审核状态" prop="status" :filters="[{text: '审核通过', value: 1}, {text: '待审核', value: 0}, {text: '审核未通过', value: -1}]"
          :filter-method="filterHandler" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1" style="color: #67C23A">审核通过</span>
            <span v-else-if="scope.row.status===0">待审核</span>
            <span v-else style="color: #F56C6C">审核未通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" v-if="scope.row.status===0&&(identity===1||identity===2)">
            <el-tooltip class="item" effect="dark" content="批准" placement="bottom">
              <el-button size="small" type="success" icon="el-icon-check" circle @click="accept(scope.row.vacate_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="否决" placement="bottom">
              <el-button size="small" type="danger" icon="el-icon-close" circle @click="refuse(scope.row.vacate_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="pagination">
      <el-pagination background layout="prev, pager, next" :current-page="pageNo" :page-size="pageSize" :total="count"
        @current-change="pageNoChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: '',
      identity: '',
      path: '', // 请求的父路径
      searchByTime: {
        start_time: '',
        end_time: ''
      },
      searchByTerm: {
        term: ''
      },
      searchByType: {
        type: ''
      },
      tableData: [],
      count: 0, // 数据总数
      pageNo: 1, // 当前页码
      pageSize: 5 // 1页存放数据数量
    }
  },
  methods: {
    tabClick () {
      this.searchByTime.start_time = ''
      this.searchByTime.end_time = ''
      this.searchByTerm.term = ''
      this.searchByType.type = ''
    },
    /* 设置用户身份信息 */
    setIdentity () {
      var storage = window.localStorage
      var user = JSON.parse(storage.user)
      var identity = storage.identity
      if (identity === '学生') {
        this.userId = user.stu_id
        this.identity = 0
        this.path = 'student'
      } else if (identity === '辅导员') {
        this.userId = user.tutor_id
        this.identity = 1
        this.path = 'tutor'
      } else if (identity === '学院') {
        this.userId = user.edu_id
        this.identity = 2
        this.path = 'edu'
      } else {
        this.userId = user.teacher_id
        this.identity = 3
        this.path = 'teacher'
      }
    },
    /* 公共方法,能根据页码查询数据 */
    findVacate (pageNo) {
      this.setIdentity()
      var url = 'http://127.0.0.1:8080/LeaveManager/' + this.path + '/find_vacate'
      this.$axios.get(url, {
        params: {
          user_id: this.userId,
          page_no: pageNo,
          page_size: this.pageSize,
          start_time: this.searchByTime.start_time,
          end_time: this.searchByTime.end_time,
          term: this.searchByTerm.term,
          type: this.searchByType.type
        }
      }).then((res) => {
        if (res.data !== '') {
          console.log(res.data)
          var response = res.data
          this.count = response.count
          this.tableData = response.data
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    /* 进主页后查询是否有待审核数据 */
    findCheckingVacate () {
      var url = 'http://127.0.0.1:8080/LeaveManager/' + this.path + '/find_checkingVacate'
      this.$axios.get(url, {
        params: {
          id: this.userId
        }
      }).then((res) => {
        /* 若有待审核的请假申请，则消息推送 */
        if (res.data.length !== 0) {
          this.$alert('您有新的请假申请待审核!', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    search () {
      this.pageNo = 1
      this.findVacate(1)
    },
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.findVacate(pageNo)
    },
    filterHandler (value, row, column) {
      /* 表格数据筛选 */
      const property = column['property']
      return row[property] === value
    },
    accept (value) {
      var vacateId = value
      var url = 'http://127.0.0.1:8080/LeaveManager/' + this.path + '/accept'
      this.$axios.get(url, {
        params: {
          user_id: this.userId,
          vacate_id: vacateId
        }
      }).then((res) => {
        this.findVacate(this.pageNo)
      }).catch((error) => {
        console.error(error)
      })
    },
    refuse (value) {
      var vacateId = value
      var url = 'http://127.0.0.1:8080/LeaveManager/' + this.path + '/refuse'
      this.$axios.get(url, {
        params: {
          user_id: this.userId,
          vacate_id: vacateId
        }
      }).then((res) => {
        this.findVacate(this.pageNo)
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  created () {
    /* 当前Vue被实例化时调用 */
    this.findVacate(1)
    if (this.identity !== 0) {
      this.findCheckingVacate()
    }
  }
}
</script>

<style scoped>
  #title {
    font-size: 1.2rem;
  }

  #pagination {
    margin-top: 1rem;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table__column-filter-trigger i {
    font-size: 4rem;
  }

  .el-table__expanded-cell[class*=cell] {
    padding: 1.2rem 12.5rem;
  }
</style>
