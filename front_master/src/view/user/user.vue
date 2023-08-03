<template>
  <div>
    <!--    <a-input-->
    <!--        v-model:value="searchValue"-->
    <!--        placeholder="Search users"-->
    <!--        style="width: 200px"-->
    <!--        @change="handleSearch"-->
    <!--    />-->
    <!--    <a-divider />-->
    <a-table :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="pagination">
      <template #customFilterIcon="{ filtered }">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'avatarUrl'">
          <a-avatar :src="record.avatarUrl||getAvatar(record)"/>
        </template>
        <template v-else-if="column.key === 'createTime'">
          {{ DateToString(record.createTime) }}
        </template>
        <template v-else-if="column.key === 'updateTime'">
          {{ DateToString(record.updateTime) }}
        </template>
        <template v-else-if="column.key === 'userRole'">
          <a-tag color="blue" v-if="record.userRole===1">管理员</a-tag>
          <a-tag color="yellow" v-else-if="record.userRole===0">用户</a-tag>

        </template>
        <template v-else-if="column.key === 'username'">
          <span v-if="record.username" style="color: #1890ff" class="username">{{ record.username }}</span>
          <span v-else class="noname">未命名用户</span>

        </template>
        <template v-else-if="column.key === 'operation'">
          <a-popconfirm
              title="请确认删除此用户?"
              placement="topRight"
              ok-text="我确认"
              cancel-text="取消"
              @confirm="() =>delUser(record.id)"


          >
            <!--            @confirm="() => handleDelete(record.id)"-->

            <a-button type="link" danger>删除用户</a-button>
          </a-popconfirm>
          <a-button type="link" @click="editUser(record)">编辑用户</a-button>
        </template>
      </template>
      <template
          #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
              ref="searchInput"
              :placeholder="`搜索 ${column.dataIndex}`"
              v-model:value="searchValue"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined/>
            </template>
            搜索
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            取消
          </a-button>
        </div>
      </template>

    </a-table>
  </div>
  <div>
    <a-drawer :width="500" title="更新用户信息" :placement="updateParams.updatePlacement" v-model:visible="updateOpen"
              @close="updateParams.onClose">
      <template #extra>
        <a-button style="margin-right: 8px" @click="updateParams.onClose">取消</a-button>
        <a-button type="primary" @click="updateParams.updateInfo">更新</a-button>
      </template>
      <a-form class="user-form">
        <a-form-item label="用户头像">
          <a-avatar :src="user.avatarUrl"></a-avatar>
          <a-space>
            <a-tag color="red"> ID:{{ user.id }}</a-tag>
          </a-space>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model:value="user.userName"/>
        </a-form-item>
        <a-form-item label="状态限制">
          <a-select v-model="user.searchStatus">
            <a-select-option value="0">
              <a-tag color="pink">
                0
              </a-tag>
            </a-select-option>
            <a-select-option value="1">
              <a-tag color="pink">
                1
              </a-tag>
            </a-select-option>
            <a-select-option value="2">
              <a-tag color="pink">
                2
              </a-tag>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="租户码">
          <a-input v-model:value="user.tenantCode"/>
        </a-form-item>
        <a-form-item label="用户账号">
          <a-input v-model:value="user.userAccount"/>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>


</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import {deleteUser, getUserList, searchUser, updateUser} from '@/api/api';
import {DateToString} from "@/utils/date";
import {SearchOutlined} from '@ant-design/icons-vue'
import {userAvatar} from "@/view/pageConfig";
import {message} from "ant-design-vue";
import {Drawer} from "ant-design-vue";

export default defineComponent({
  components: {
    ADrawer: Drawer,
    SearchOutlined
  },
  setup() {
    // let state={
    let dataSource = ref([])
    // }
    // 模拟请求参数
    let requestParam = {
      current: 1,
      size: 50
    }
    const searchInput = ref();
    const user = ref({
      avatarUrl: "",
      searchStatus: 0,
      tenantCode: "",
      userAccount: "",
      userId: 0,
      userName: "",
    });
    let updateOpen = ref(false)

    const updateParams = {
      updatePlacement: 'right',
      onClose: function () {
        updateOpen.value = false
      },
      updateInfo: function () {
        // console.log('更新的信息', user.value)
        // if(!user.value){
        updateUser(user.value).then(res => {
          if (res.data.code === 0) {
            message.info('更新成功')
            updateOpen.value = false
          } else {
            message.warn(res.data.message)
          }
        })
        // }

      },
    }

    const delUser=(id)=>{
      deleteUser(id).then(res=>{
        if(res.data.code===0){
          message.success('删除用户成功！')
        }
      })
    }
    const editUser = (userInfo) => {
      user.value.avatarUrl = userInfo.avatarUrl
      user.value.searchStatus = userInfo.searchStatus
      user.value.tenantCode = userInfo.tenantCode
      user.value.userAccount = userInfo.userAccount
      user.value.userId = userInfo.id
      user.value.userName = userInfo.userName
      updateOpen.value = true
      console.log('编辑用户信息', updateOpen.value, user.value)
    }
    let searchValue = ref(undefined)
    let loading = ref(true)

    function fetchData() {
      getUserList(requestParam).then((response) => {
        // loading.value=true
        // console.log('用户列表',response)
        dataSource.value = response.data.data.records;
      }).catch(err => {
        console.log('userErr', err)
      }).finally(() => {
        // loading.value=false
        setTimeout(() => {
          loading.value = false
          // console.log('dataSource', dataSource)
        }, 100)
      })
    }

    function getAvatar(record) {
      record.avatarUrl = userAvatar[record.id % userAvatar.length]
      return userAvatar[record.id % userAvatar.length]
    }

    function handleSearch(selectedKeys, confirm) {
      console.log('搜索参数', selectedKeys, confirm)
      if (searchValue.value) {
        searchUser({
          ...requestParam,
          username:searchValue.value
        }).then((response) => {
          dataSource.value = response.data.data.records
        });
      } else {
        fetchData();
      }
    }

    const handleReset = clearFilters => {
      clearFilters({
        confirm: true,
      });
      searchValue.value = '';
    };


    function handleDelete(id) {
      deleteUser({userId: id}).then(() => {
        message.success('删除用户成功！')
        fetchData();
      });
    }

    onMounted(() => {
      fetchData();
    })


    return {
      searchValue,
      dataSource,
      loading,
      pagination: {
        pageSize: 8
      },
      getAvatar,
      DateToString: (date) => {
        return DateToString(date)
      },
      statusColorMap: {
        0: 'default',
        1: 'success',
        2: 'warning',
        3: 'error',
      },
      user,
      columns: [
        {key: 'id', dataIndex: 'id', title: 'ID',},
        {key: 'avatarUrl', dataIndex: 'avatarUrl', title: '头像'},
        {
          key: 'userName',
          dataIndex: 'userName',
          title: '用户名',
          customFilterDropdown: true,
          onFilterDropdownOpenChange: visible => {
            if (visible) {
              setTimeout(() => {
                searchValue.value.focus();
              }, 100);
            }
          },
        },
        {key: 'userAccount', dataIndex: 'userAccount', title: '用户账号'},
        {key: 'tenantCode', dataIndex: 'tenantCode', title: '租户码'},
        {key: 'userRole', dataIndex: 'userRole', title: '用户角色'},
        {key: 'createTime', dataIndex: 'createTime', title: '创建时间'},
        {key: 'updateTime', dataIndex: 'updateTime', title: '更新时间'},
        {key: 'operation', dataIndex: 'operation', title: '操作'},
      ],
      handleDelete,
      handleSearch,
      updateParams,
      updateOpen,
      editUser,
      searchInput,
      handleReset,
      delUser
    };

  },

});
</script>

<style>
.username {
  color: #42b983;
  font-weight: bold;
}

.noname {
  color: #999999;
  font-weight: bold;
}
</style>
