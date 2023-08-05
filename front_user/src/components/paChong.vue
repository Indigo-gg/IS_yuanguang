<template>
  <div>
    <h2>爬虫任务设置</h2>

    <!-- 添加任务表单 -->
    <form @submit.prevent="addTask">
      <label for="taskName">任务名称:</label>
      <input type="text" id="taskName" v-model="newTask.name">

      <label for="taskType">任务类型:</label>
      <select id="taskType" v-model="newTask.type">
        <option value="website">网站</option>
        <option value="file">文件目录</option>
        <option value="ftp">FTP</option>
        <option value="database">数据库</option>
      </select>

      <label for="taskConfig">任务配置:</label>
      <textarea id="taskConfig" v-model="newTask.config"></textarea>

      <button type="submit">添加任务</button>
    </form>

    <!-- 任务列表 -->
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.name }}</h3>
        <p>类型: {{ task.type }}</p>
        <p>配置: {{ task.config }}</p>
        <button @click="executeTask(task.id)" :disabled="task.status === 'running'">执行任务</button>
        <button @click="abortTask(task.id)" :disabled="task.status === 'stopped'">中断任务</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      newTask: {
        name: '',
        type: 'website',
        config: '',
      },
      tasks: [
        {
          id: 1,
          name: '爬虫任务1',
          type: 'website',
          config: 'http://example.com',
          status: 'stopped',
        },
        {
          id: 2,
          name: '爬虫任务2',
          type: 'file',
          config: '/path/to/files',
          status: 'stopped',
        },
        // 更多任务...
      ],
    };
  },
  methods: {
    addTask() {
      const taskId = this.tasks.length + 1;
      this.tasks.push({
        id: taskId,
        name: this.newTask.name,
        type: this.newTask.type,
        config: this.newTask.config,
        status: 'stopped',
      });
      this.newTask = {
        name: '',
        type: 'website',
        config: '',
      };
    },
    executeTask(taskId) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return;
      this.tasks[taskIndex].status = 'running';
      // 执行任务的逻辑
      // ...
    },
    abortTask(taskId) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return;
      this.tasks[taskIndex].status = 'stopped';
      // 中断任务的逻辑
      // ...
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

li {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 5px;
}
</style>