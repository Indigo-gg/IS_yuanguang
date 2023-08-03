<template>
  <div>
    <div class="add-btn">
      <a-button type="primary" size="large" shape="circle" @click="addTemp">
        <template #icon>
          <PlusOutlined/>
        </template>
      </a-button>
    </div>

    <a-table :columns="columns" :dataSource="templates" row-key="id" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'createTime'">
          {{ DateToString(record.createTime) }}
        </template>
        <template v-else-if="column.dataIndex==='color'">
          <a-tag :color="record.color">
            <span style="color: #999999">{{ record.color }}</span>
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex==='isPublic'">
          <a-tag color="red" v-if="record.isPublic===1">
            已公开
          </a-tag>
          <a-tag color="blue" v-else>
            未公开
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex==='style'">
          <span :style="{fontSize:record.style}">{{ record.style }}</span>
        </template>
        <template v-else-if="column.dataIndex==='button'">
          <a-button :style="{fontSize:record.button}" size="small" shape="round" v-if="record.button===0"
                    type="primary">
            {{ getButtonText(record.button) }}

            <template #icon>
              <SearchOutlined></SearchOutlined>
            </template>
          </a-button>
          <a-button :style="{fontSize:record.button}" size="small" v-else-if="record.button===1" type="primary">
            {{ getButtonText(record.button) }}
            <template #icon>
              <SearchOutlined></SearchOutlined>

            </template>
          </a-button>
          <a-button :style="{fontSize:record.button}" size="small" v-else-if="record.button===2" type="dashed">
            {{ getButtonText(record.button) }}
            <template #icon>
              <SearchOutlined></SearchOutlined>

            </template>
          </a-button>
          <a-button :style="{fontSize:record.button}" size="small" v-else>未知按钮</a-button>

        </template>
        <template v-else-if="column.dataIndex === 'updateTime'">
          {{ DateToString(record.updateTime) }}
        </template>

      </template>
      <template #action="{record}">
        <div class="flex-row-space-around">
          <a-popconfirm
              title="请确认删除此模板?"
              placement="topRight"
              ok-text="我确认"
              cancel-text="取消"
              @confirm="() =>deleteTemp(record.id)"
          >
            <a-button type="link" danger>删除模板</a-button>
          </a-popconfirm>
          <a-button type="link" @click="editTemp(record)">编辑</a-button>
        </div>

      </template>
    </a-table>
    <a-modal v-model:visible="visible" @ok="submitForm" :confirm-loading="confirmLoading" ok-text="确认"
             cancel-text="取消">
      <a-form ref="formRef" :model="formData" style="padding: 1em">
        <!--        <a-form-item name="" v-for="item in columns" :key="item.key">-->
        <!--          -->
        <!--        </a-form-item>-->
        <a-form-item name="searchs" :label="getColByName('searchs')" :has-feedback="true"
                     :validate-status="validateStatus" :help="helpMessage">
          <a-select
              v-model:value="formData.searchs"
              style="width: 320px"
          >
            <a-select-option v-for="option in TMap.searchs" :value="option.value" :key="option.value">
              {{ option.text }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item name="color" :label="getColByName('color')" :has-feedback="true" :validate-status="validateStatus"
                     :help="helpMessage">
          <a-select
              v-model:value="formData.color"
              style="width: 320px"
          >
            <a-select-option v-for="option in TMap.color" :value="option.value" :key="option.value"
                             style="text-align: center">
              <a-tag :color="option.value">
                <span style="color: #999999">
                  {{ option.text }}
                </span>
              </a-tag>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item name="style" :label="getColByName('style')" :has-feedback="true" :validate-status="validateStatus"
                     :help="helpMessage">
          <a-select
              v-model:value="formData.style"
              style="width: 320px"
          >
            <a-select-option v-for="option in TMap.style" :value="option.value" :key="option.value"
                             style="text-align: center">
              <span :style="{fontSize:option.value}">{{ option.text }}</span>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item name="button" :label="getColByName('button')">
          <a-select
              v-model:value="formData.button"
              style="width: 320px;"
          >
            <a-select-option v-for="option in TMap.button" :value="option.value" :key="option.value"
                             style="text-align: center">
              <a-button :style="{fontSize:option.value}" size="small" shape="round" v-if="option.value===0"
                        type="primary">
                {{ option.text }}

                <template #icon>
                  <SearchOutlined></SearchOutlined>
                </template>
              </a-button>
              <a-button :style="{fontSize:option.value}" size="small" v-else-if="option.value===1" type="primary">
                {{ option.text }}
                <template #icon>
                  <SearchOutlined></SearchOutlined>

                </template>
              </a-button>
              <a-button :style="{fontSize:option.value}" size="small" v-else-if="option.value===2" type="dashed">
                {{ option.text }}
                <template #icon>
                  <SearchOutlined></SearchOutlined>

                </template>
              </a-button>
              <a-button :style="{fontSize:option.value}" size="small" v-else>未知按钮</a-button>

            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <div class="bottom">
        {{ formData.userAccount }}最后一次更新于
        <span v-if="formData.updateTime" v-text="DateToString(formData.updateTime)">
        </span>
        <span v-else>
          {{ new Date().toLocaleDateString() }}
        </span>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {nextTick, ref} from "vue";
import {message} from "ant-design-vue";
import {addTemplate, deleteTemplate, getTemplateList, updateTemplate} from "@/api/template";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons-vue";
import {template} from "@/view/pageConfig";
import {DateToString} from "@/utils/date";

export default {
  name: "index",
  components: {
    PlusOutlined,
    SearchOutlined
  },
  setup() {
    const templates = ref([]); // 模板列表数据
    const visible = ref(false); // 控制新增/编辑弹窗的显示
    const confirmLoading = ref(false); // 控制新增/编辑弹窗确定按钮的loading状态
    const formRef = ref(); // 表单引用
    const requestParams = {
      size: 50,
      current: 1
    }
    const formData = ref({
      button: 1,
      color: '',
      createTime: '',
      id: undefined,
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
        key: 1,
        title: '搜索模式',
        dataIndex: 'searchs',
      },
      {
        key: 2,
        title: '按钮类型',
        dataIndex: 'button',
      },
      {
        key: 3,
        title: '页面颜色',
        dataIndex: 'color',
      },
      {
        key: 4,
        title: '是否公开',
        dataIndex: 'isPublic',
      },
      {
        key: 5,
        title: '发布用户',
        dataIndex: 'userAccount',
      },
      {
        key: 6,
        title: '字体大小',
        dataIndex: 'style',
      },

      {
        key: 7,
        title: '更新时间',
        dataIndex: 'updateTime',
      }, {
        key: 8,
        title: '创建时间',
        dataIndex: 'createTime',
      },


      {
        key: 0,
        title: '操作',
        dataIndex: 'action',
        width: '10%',
        slots: {customRender: 'action'},
      },
    ];
    const getColByName = (name) => {
      return columns.find(i => {
        return i.dataIndex === name
      }).title
    }
    // 页面加载时获取模板列表
    const getListTemp = () => {
      getTemplateList(requestParams).then(res => {
        templates.value = res.data.data.records
      })
    };

    // 新增模板
    const addTemp = () => {
      console.log('表单对象', formRef.value)
      visible.value = true; // 显示新增/编辑弹窗
      nextTick(() => {
        formRef.value.resetFields(); // 重置表单
      })
    };

    // 编辑模板
    const editTemp = (record) => {
      formData.value = {...record};
      visible.value = true; // 显示新增/编辑弹窗
    };

    // 确认提交表单
    const submitForm = () => {
      formRef.value
          .validate()
          .then(() => {
            confirmLoading.value = true; // 开启确定按钮的loading状态
            const payload = {
              ...formData.value,
              templateId: formData.value.id
            };
            if (payload.id) {
              updateTemplate(payload).then(res => {
                if (res.data.code === 0) {
                  formData.value.id = undefined
                  getListTemp();
                }
              })
            } else {
              addTemplate(payload).then(res => {
                if (res.data.code === 0) {
                  message.success('新增成功')
                  confirmLoading.value = false
                  getListTemp();
                }
              })
            }
            visible.value = false
          })
          .catch(() => {
            // 验证不通过时的提示
            message.error('表单验证失败');
          });
    };

    // 删除模板
    const deleteTemp = (id) => {

      deleteTemplate({
        templateId: id
      }).then(res => {
        if (res.data.code === 0) {
          message.info('删除模板成功')
          getListTemp()
        } else
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
      getColByName, TMap: template.map,
      DateToString: (date) => {
        return DateToString(date)
      },
      getButtonText: (value) => {
        return template.map.buttonText(value)
      }
    };
  }
}
</script>

<style scoped>
.add-btn {
  position: absolute;
  bottom: 10vw;
  right: 3vw;
}
</style>
