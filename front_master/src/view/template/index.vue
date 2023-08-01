<template>
  <div>
    <a-button type="primary" round @click="addTemp">添加</a-button>
    <a-table :columns="columns" :dataSource="templates" row-key="id" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'avatarUrl'">
          <a-avatar :src="record.avatarUrl"/>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" @ok="submitForm" :confirm-loading="confirmLoading">
      <a-form :ref="formRef">
        <a-form-item label="搜索关键词" :has-feedback="true" :validate-status="validateStatus" :help="helpMessage">
          <a-input v-model:value="formData.searchs" />
        </a-form-item>
        <a-form-item label="按钮类型">
          <a-radio-group v-model:value="formData.button">
            <a-radio-button :value="0">普通按钮</a-radio-button>
            <a-radio-button :value="1">特殊按钮</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!-- 其他表单项省略 -->
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {ref} from "vue";
import {message} from "ant-design-vue";
import {deleteTemplate, getTemplateList} from "@/api/template";

export default {
  name: "index",
  setup(){
    const templates = ref([]); // 模板列表数据
    const visible = ref(false); // 控制新增/编辑弹窗的显示
    const confirmLoading = ref(false); // 控制新增/编辑弹窗确定按钮的loading状态
    const formRef = ref(null); // 表单引用
    const requestParams={
      size:50,
      current:1
    }
    const formData = ref({
      button: 0,
      color: '',
      createTime: '',
      id: 0,
      isDeleted: 0,
      isPublic: 0,
      searchs: '',
      style: '',
      updateTime: '',
      userAccount: '',
    }); // 表单数据
    const validateStatus = ref(''); // 表单验证状态
    const helpMessage = ref(''); // 表单验证提示信息

    // 表格列配置
    const columns = [
      {
        title: '搜索关键词',
        dataIndex: 'searchs',
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '10%',
        slots: { customRender: 'action' },
      },
    ];

    // 页面加载时获取模板列表
    const getListTemp = () => {
      getTemplateList(requestParams).then(res=>{
        templates.value=res.data.data.records
      })
    };

    // 新增模板
    const addTemp = () => {
      formRef.value.resetFields(); // 重置表单
      visible.value = true; // 显示新增/编辑弹窗
    };

    // 编辑模板
    const editTemp = (record) => {
      formData.value = { ...record };
      visible.value = true; // 显示新增/编辑弹窗
    };

    // 确认提交表单
    const submitForm = () => {
      formRef.value
          .validate()
          .then(() => {
            confirmLoading.value = true; // 开启确定按钮的loading状态
            const payload = { ...formData.value };
            if (payload.id) {
              // 调用接口updateTemplate更新模板
            } else {
              // 调用接口addTemplate新增模板
            }
          })
          .catch(() => {
            // 验证不通过时的提示
            message.error('表单验证失败');
          });
    };

    // 删除模板
    const deleteTemp = (record) => {

      deleteTemplate({
        templateId:record.id
      }).then(res=>{
        if(res.data.code===0)
          message.info('删除模板成功')
        else
          message.error('删除模板失败')
      })

    };

    // 分页改变时触发
    const handlePageChange = (page) => {
      console.log(page);
    };

    // 页面加载时获取模板列表
    getListTemp();

    return {
      templates,
      visible,
      confirmLoading,
      formRef,
      formData,
      validateStatus,
      helpMessage,
      columns,
      addTemp,
      editTemp,
      submitForm,
      deleteTemp,
      handlePageChange,
    };
  }
}
</script>

<style scoped>

</style>
