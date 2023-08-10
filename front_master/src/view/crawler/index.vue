<template>
  <div class="body">
    <!-- 任务表单 -->
    <div class="task">
      <h3 style="text-align: center">设置爬虫任务</h3>
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

    </div>

    <div class="data">
      <div class="center">
        <a-button @click="getAll">所有任务</a-button>
        <a-button @click="getRunning">运行中任务</a-button>
        <a-button @click="getWaiting">等待中任务</a-button>
      </div>

      <!-- 任务列表 -->
      <a-table :columns="columns" :dataSource="list" rowKey="index" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button size="small"
                      v-if="record.property==='running'"
                      @click="handlePause(record)">暂停
            </a-button>

            <a-button size="small"
                      v-else-if="record.property==='paused'"
                      @click="handleResume(record)">恢复
            </a-button>

            <a-button size="small" type="danger"
                      @click="handleCancel(record)">取消
            </a-button>
          </template>
          <template v-if="column.dataIndex === 'property'">
            <a-tag color="green" v-if="record.property==='running'">运行中</a-tag>
            <a-tag color="blue" v-if="record.property==='paused'">已暂停</a-tag>
            <a-tag color="yellow" v-if="record.property==='waiting'">等待中</a-tag>



          </template>
          <template v-if="column.dataIndex === 'total'">
            <a-tag color="green" >{{record.success}}</a-tag>/
            <a-tag color="blue">{{record.total}}</a-tag>

          </template>
        </template>
      </a-table>
    </div>
    <!-- 查询按钮 -->

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
import {message} from "ant-design-vue";
export default {

  setup() {

    const form = reactive({
      deep: 3,
      name: "爬虫任务" + new Date().getDay(),
      target: "https://news.ifeng.com/c/8S1oKnHt6Zy"
    })
    const list = ref([])

    function resetForm(){
      form.name=''
      form.target=''
    }
    function  handleSubmit() {
       addTask(form).then(()=>{
         message.success('任务提交成功！')
         getAll();
         resetForm()
       })
    }
    function handlePause(row) {
       pauseTask({
         index:row.index
       }).then(()=>{
         getAll();
       })
    }

    function handleResume(row) {
       resumeTask({
         index:row.index
       }).then(()=>{
        getAll();
      })
    }

    function handleCancel(row) {
       cancelTask({
         index:row.index
       }).then(()=>{
         getAll();
       })
    }

    function setData(res){
      if(res.data.data.length>0&&res.data.code===0){
        list.value=res.data.data
      }else {
        list.value=[]
      }
    }

    function getAll() {
      // console.log('开始获取爬虫任务')

      getAllTasks().then(res=>{
         setData(res)
          console.log('拿到的爬虫任务',res.data.data)
      })
    }

    function getRunning() {
      getRunningTasks(res=>{
        setData(res)
      });
    }

    function getWaiting() {
       getWaitingTasks(res=>{
         setData(res)
      });
    }



    onMounted(()=>{
      console.log('获取爬虫任务')

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
          title: '成功/总数',
          dataIndex: 'total',
        },
        {
          key: 0,
          title: '操作',
          dataIndex: 'action',
          width: '10%',
          // slots: {customRender: 'action'},
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
.task{
  padding: 10px;
  background-color: #fafafa;
}
.data{
  margin: 40px;
  padding: 10px;
  /*background-color: #fafafa;*/
}
</style>
