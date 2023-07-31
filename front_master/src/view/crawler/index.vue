<template>
  <div>
    <!-- 任务表单 -->
    <a-form :model="form" :label-width="120" @submit.prevent="handleSubmit">
      <a-form-item label="任务名称">
        <a-input v-model="form.name"></a-input>
      </a-form-item>

      <a-form-item label="任务描述">
        <a-input v-model="form.description" type="textarea"></a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" native-type="submit">提交</a-button>
      </a-form-item>
    </a-form>

    <!-- 任务列表 -->
    <a-table :data="list">
      <a-table-column label="名称" prop="name"></a-table-column>

      <a-table-column label="状态">
        <template #default="{row}">
          <a-tag :type="getTagType(row.status)">
            {{ row.status }}
          </a-tag>
        </template>
      </a-table-column>

      <a-table-column label="操作">
        <template #default="{row}">
          <a-button size="small"
                     v-if="row.status=='运行中'"
                     @click="handlePause(row)">暂停</a-button>

          <a-button size="small"
                     v-else
                     @click="handleResume(row)">恢复</a-button>

          <a-button size="small" type="danger"
                     @click="handleCancel(row)">取消</a-button>
        </template>
      </a-table-column>
    </a-table>

    <!-- 查询按钮 -->
    <a-button @click="getAll">所有任务</a-button>
    <a-button @click="getRunning">运行中任务</a-button>
    <a-button @click="getWaiting">等待中任务</a-button>

  </div>
</template>

<script>
import { addTask, cancelTask, pauseTask, resumeTask, getAllTasks, getRunningTasks, getWaitingTasks } from '@/api/scrawl.js';

export default {
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      list: []
    };
  },

  async created() {
    await this.getAll();
  },

  methods: {
    async handleSubmit() {
      await addTask(this.form);
      await this.getAll();
      this.form = {};
    },

    async handlePause(row) {
      await pauseTask(row.id);
      await this.getAll();
    },

    async handleResume(row) {
      await resumeTask(row.id);
      await this.getAll();
    },

    async handleCancel(row) {
      await cancelTask(row.id);
      await this.getAll();
    },

    async getAll() {
      this.list = await getAllTasks();
    },

    async getRunning() {
      this.list = await getRunningTasks();
    },

    async getWaiting() {
      this.list = await getWaitingTasks();
    },

    getTagType() {
      // 计算类型逻辑
    }
  }
};
</script>
<style scoped>

</style>