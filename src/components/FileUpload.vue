<template>
  <div id="file-upload">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://127.0.0.1:8080/LeaveManager/edu/fileupload"
      :auto-upload="false"
      :before-upload="beforeUploadFile"
      :multiple="false"
      :limit="1"
      :file-list="fileList"
      :on-exceed="handleExceed"
      accept=".xlsx">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传1个Excel文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    beforeUploadFile (file) {
      let isExcel = file.name.substring(file.name.lastIndexOf('.') + 1) === 'xlsx'
      let isFit = file.size / 1024 <= 500
      if (!isExcel) {
        this.$message({
          showClose: true,
          message: '上传文件只能是 xlsx 格式!',
          type: 'warning'
        })
      } else if (!isFit) {
        this.$message({
          showClose: true,
          message: '上传文件大小不符!',
          type: 'warning'
        })
      } else {
        let formData = new FormData()
        formData.append('file', file)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$axios.post('http://127.0.0.1:8080/LeaveManager/edu/fileupload', formData, config).then(res => {
          if (res.data !== 0) {
            this.$message({
              showClose: true,
              message: '成功导入' + res.data + '条辅导员信息!',
              type: 'success'
            })
          }
        })
      }
      return false
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>

<style scoped>

</style>
