<template>
  <div>
    <div class="add-btn">
      <a-button type="primary" size="large" shape="circle" @click="openAddModal">
        <template #icon>
          <PlusOutlined/>
        </template>
      </a-button>
    </div>
    <a-table :columns="columns" :dataSource="documents" rowKey="id" :scroll="{ x: 1500 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'imgUrl'">
          <a-avatar shape="square" size="large" :src="record.imgUrl||require('@/assets/boy.png')"/>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <a-tag color="blue">{{ record.type }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'website'">
          <a target="_blank" :href="record.website"> {{ record.website }}</a>
        </template>
        <template v-if="column.dataIndex === 'timestamp'">
          <a> {{DateToString(record.timestamp)}}</a>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-button type="link" @click="openEditModal(record)">编辑</a-button>
          <a-button type="link" @click="deleteDocument(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="modalVisible" @ok="handleOk" @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item label="标题" name="title" required>
          <a-input v-model:value="form.title"/>
        </a-form-item>
        <a-form-item label="内容" name="content" required>
          <a-input v-model:value="form.content"/>
        </a-form-item>
        <a-form-item label="封面地址" name="imgUrl" required>
          <a-input v-model:value="form.imgUrl"/>
        </a-form-item>
        <a-form-item label="类型" name="type" required>
          <a-input v-model:value="form.type"/>
        </a-form-item>
        <a-form-item label="来源网址" name="website" required>
          <a-input v-model:value="form.website"/>
        </a-form-item>
        <!-- 其他表单项根据您的需求添加 -->
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {deleteFile, findFile} from "@/api/result";
import {user} from '@/view/pageConfig'
import {PlusOutlined} from "@ant-design/icons-vue";
import {DateToString} from "@/utils/date";

export default {
  name: "index",
  components: {
    PlusOutlined
  },
  setup() {
    const form = ref({
      title: '',
      content: "",
      imgUrl: "",
      tenantCode: user.getUserInfo(),
      type: "",
      website: ""
    });
    const documents = ref([
      // 根据接口返回的文档列表进行初始化
    ]);
    const modalVisible = ref(false);
    const formMode = ref('add');
    const selectedDocument = ref(null);
    const requestParams = {
      page: 1,
      size: 100
    }
    const columns = [
      {
        key: 1,
        title: '索引',
        dataIndex: 'id',
        fixed: 'left',
        width: 300
      },
      {
        key: 2,
        title: '标题',
        dataIndex: 'title',
      },
      {
        key: 3,
        title: '内容',
        dataIndex: 'content',
      },
      {
        key: 4,
        title: '网址来源',
        dataIndex: 'website',
      },
      {
        key: 5,
        title: '图片地址',
        dataIndex: 'imgUrl',
        width: 100
      },
      {
        key: 6,
        title: '文档类型',
        dataIndex: 'type',
      },

      {
        key: 8,
        title: '创建时间',
        dataIndex: 'timestamp',
      },


      {
        key: 0,
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        width: '10%'
      },
    ];

    const openAddModal = () => {
      formMode.value = 'add';
      modalVisible.value = true;
      form.value.resetFields();
    };

    const openEditModal = (record) => {
      formMode.value = 'edit';
      modalVisible.value = true;
      selectedDocument.value = record;
      form.value.setFieldsValue(record);
    };

    const handleOk = () => {
      form.value.validateFields().then(() => {
        if (formMode.value === 'add') {
          // 调用新增文档接口
          // 使用values提交文档的属性
          // 成功后刷新文档列表 documents
        } else if (formMode.value === 'edit') {
          // 调用编辑文档接口
          // 使用selectedDocument.value.id和values提交文档的属性
          // 成功后刷新文档列表 documents
        }
        modalVisible.value = false;
      });
    };

    const handleCancel = () => {
      modalVisible.value = false;
    };

    const deleteDocument = (id) => {
      // 调用删除文档接口
      deleteFile({
        id: id
      }).then(res => {
        if (res.data.code === 0) {
          getList()
        }
      })
      // 使用id删除文档
      // 成功后刷新文档列表 documents
    };

    const getList = () => {
      findFile({
        // keyword: '',
        keyword:'',
        ...requestParams
      }).then(r => {
        documents.value = r.data.data.content
      })
    }
    onMounted(() => {
      getList()
    })


    return {
      form,
      documents,
      modalVisible,
      columns,
      openAddModal,
      openEditModal,
      handleOk,
      handleCancel,
      deleteDocument,
      DateToString:(time)=>{
        return DateToString(time)
      }
    };
  },
}
</script>

<style scoped>
.add-btn {
  position: absolute;
  bottom: 10vw;
  right: 3vw;
}
</style>
