<template>
  <div class="app-container">
    <el-form label-width="120px">

      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>

      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import hospitalSetApi from '@/api/hosp/hospitalSet'

const defaultForm = {
  id: '',
  hosname: '',
  hoscode: '',
  apiUrl: '',
  signKey: '',
  contactsName: '',
  contactsPhone: ''
}

export default {
  data() {
    return {
      hospitalSet: defaultForm,
      saveBtnDisabled: false
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // 表单初始化
    init() {
      // debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.hospitalSet = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      if (!this.hospitalSet.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 新增
    saveData() {
      hospitalSetApi.save(this.hospitalSet).then(response => {
        // debugger
        this.$message.success(response.message)
        this.$router.push({ path: '/hosp/hospitalSet/list' })
      })
    },

    // 根据id更新记录
    updateData() {
      hospitalSetApi.updateById(this.hospitalSet).then(response => {
        this.$message.success(response.message)
        this.$router.push({ path: '/hosp/hospitalSet/list' })
      })
    },

    back() {
      this.$router.push({ path: '/hosp/hospitalSet/list' })
    },

    // 根据id查询记录
    fetchDataById(id) {
      hospitalSetApi.getById(id).then(response => {
        // debugger
        this.hospitalSet = response.data
      })
    }
  }
}
</script>
