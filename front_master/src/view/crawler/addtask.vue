<template>
  <a-form :model="form">
    <a-form-item label="任务名称">
      <a-input v-model="form.name" />
    </a-form-item>
    <a-button htmlType="submit">提交添加</a-button>
  </a-form>
</template>

<script lang="ts">
import { addTask } from 'front_master/src/api/scrawl.js'

export default {
  data() {
    return {
      form: {}
    }
  },

  methods: {
    async onSubmit() {
      await addTask(this.form)
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>