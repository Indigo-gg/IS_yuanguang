<template>
  <div class="body">
    <!-- 任务表单 -->
    <a-form :model="form" :label-width="120" @submit.prevent="handleSubmit">
      <a-form-item label="任务名称">
        <a-input v-model:value="form.name"></a-input>
      </a-form-item>

      <a-form-item label="任务目标">
        <a-input v-model:value="form.target" type="textarea"></a-input>
      </a-form-item>

      <a-form-item>
        <div style="text-align: center">
          <a-button type="primary" @click="handleSubmit">提交</a-button>

        </div>
      </a-form-item>
    </a-form>

    <!-- 查询按钮 -->
    <div class="center">
      <a-button @click="getAll">所有任务</a-button>
      <a-button @click="getRunning">运行中任务</a-button>
      <a-button @click="getWaiting">等待中任务</a-button>
    </div>

    <!-- 任务列表 -->
    <a-table :columns="columns" :dataSource="list" rowKey="id" >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button size="small"
                    v-if="record.property==='running'"
                    @click="handlePause(record)">暂停
          </a-button>

          <a-button size="small"
                    v-else-if="record.property==='pause'"
                    @click="handleResume(record)">恢复
          </a-button>

          <a-button size="small" type="danger"
                    @click="handleCancel(record)">取消
          </a-button>
        </template>
      </template>

    </a-table>
  </div>
</template>

<script>
import {
  addTask,
  cancelTask,
  pauseTask,
  resumeTask,
  getAllTasks,
  getRunningTasks,
  getWaitingTasks
} from '@/api/scrawl.js';
import {onMounted, reactive, ref} from "vue";

export default {

  setup() {

    const form = reactive({
      deep: 1,
      name: "爬虫任务" + new Date().getDay(),
      target: "https://news.ifeng.com/c/8S1oKnHt6Zy"
    })
    let list = ref([])

    function resetForm(){
      form.name=''
      form.target=''
    }
    function  handleSubmit() {
       addTask(form).then(()=>{
         getAll();
         resetForm()
       })
    }
    function handlePause(row) {
       pauseTask(row.id).then(()=>{
         getAll();
       })
    }

    function handleResume(row) {
       resumeTask(row.id).then(()=>{
        getAll();
      })
    }

    function handleCancel(row) {
       cancelTask(row.id).then(()=>{
         getAll();
       })
    }

    function getAll() {
       getAllTasks(res=>{
         list.value =res.data.data
      });
    }

    function getRunning() {
      getRunningTasks(res=>{
        list.value =res.data
      });
    }

    function getWaiting() {
       getWaitingTasks(res=>{
        list.value =res.data
      });
    }



    onMounted(()=>{
      getAll()
      // handleSubmit()
    })



    return {
      form,
      list,
      getWaitingTasks,
      getRunningTasks,
      getRunning,
      getWaiting,
      handlePause,
      handleCancel,
      handleResume,
      handleSubmit,
      getAll,

      // "type": "http",
      // "url": "https://news.sina.com.cn/c/xl/2023-07-17/doc-imzazaum4870027.shtml"
      columns:[
        {
          key: 1,
          title: '索引',
          dataIndex: 'index',
        },
        {
          key: 2,
          title: '任务名称',
          dataIndex: 'name',
        },
        {
          key: 3,
          title: '属性',
          dataIndex: 'property',
        },
        {
          key: 4,
          title: '目标网址',
          dataIndex: 'url',
        },
        {
          key: 5,
          title: '总数',
          dataIndex: 'total',
        },
        {
          key: 0,
          title: '操作',
          dataIndex: 'action',
          width: '10%',
          slots: {customRender: 'action'},
        },
      ]
    };

  },

};
</script>
<style scoped>
.body{
  padding: 3vw;
}
.center{
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
</style>
