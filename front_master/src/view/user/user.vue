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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'avatarUrl'">
          <a-avatar :src="record.avatarUrl||getAvatar(record.id)"/>
        </template>
        <template v-else-if="column.key === 'createTime'">
          {{ DateToString(record.createTime) }}
        </template>
        <template v-else-if="column.key === 'updateTime'">
          {{ DateToString(record.updateTime) }}
        </template>
        <template v-else-if="column.key === 'username'">
          <span v-if="record.username" class="username">{{ record.username }}</span>
          <span v-else class="noname">未命名用户</span>

        </template>
        <template v-else-if="column.key === 'operation'">
          <a-popconfirm
              title="请确认删除此用户?"
              placement="topRight"
              ok-text="我确认"
              cancel-text="取消"
              @confirm="() =>editUser(record)"


          >
<!--            @confirm="() => handleDelete(record.id)"-->

            <a-button type="link" danger>删除用户</a-button>
          </a-popconfirm>
          <a-button type="link" @click="editUser(record)">编辑用户</a-button>
        </template>
      </template>
    </a-table>
  </div>
  <div>
    <a-drawer  :width="200" title="更新用户信息" :placement="updateParams.updatePlacement"  v-model:visible="updateOpen" @close="updateParams.onClose">
      <template #extra>
        <a-button style="margin-right: 8px" @click="updateParams.onClose">取消</a-button>
        <a-button type="primary" @click="updateParams.updateInfo">更新</a-button>
      </template>
      <a-form class="user-form">
        <a-form-item label="Avatar URL">
          <a-input v-model="user.avatarUrl" />
        </a-form-item>
        <a-form-item label="Search Status">
          <a-select v-model="user.searchStatus">
            <a-select-option value="0">Not Searching</a-select-option>
            <a-select-option value="1">Searching</a-select-option>
            <a-select-option value="2">Advanced Searching</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tenant Code">
          <a-input v-model="user.tenantCode" />
        </a-form-item>
        <a-form-item label="User Account">
          <a-input v-model="user.userAccount" />
        </a-form-item>
        <a-form-item label="User ID">
          <a-input-number v-model="user.userId" />
        </a-form-item>
        <a-form-item label="User Name">
          <a-input v-model="user.userName" />
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>


</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import {deleteUser, getUserList, searchUser, updateUser} from '@/api/api';
import {DateToString} from "@/utils/date";
import {userAvatar} from "@/view/pageConfig";
import {message} from "ant-design-vue";
import {Drawer} from "ant-design-vue";

export default defineComponent({
  components:{
    ADrawer:Drawer
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
    const user = ref({
      avatarUrl: "",
      searchStatus: 0,
      tenantCode: "",
      userAccount: "",
      userId: 0,
      userName: "",
    });
    let updateOpen=ref(false)

    const updateParams={
      updatePlacement:'right',
      onClose:function (){
        updateOpen.value=false
      },
      updateInfo:function (){
        updateUser(user).then(res=>{
          if(res.data.code===0){
            message.info('更新成功')
          }
        })
      },
    }
    const editUser= (userInfo)=>{
      user.value.avatarUrl   =userInfo.avatarUrl
      user.value.searchStatus=userInfo.searchStatus
      user.value.tenantCode =userInfo.tenantCode
      user.value.userAccount=userInfo.userAccount
      user.value.userId     =userInfo.userId
      user.value.userName   =userInfo.userName
      updateOpen.value=true
      console.log('编辑用户信息',updateOpen.value,user.value)
    }
    let searchValue = ref(undefined)
    let loading = ref(true)

    function fetchData() {
      getUserList(requestParam).then((response) => {
        // loading.value=true
        console.log('用户列表',response)
        dataSource.value = response.data.data.records;
      }).catch(err => {
        console.log('userErr', err)
      }).finally(() => {
        // loading.value=false
        setTimeout(() => {
          loading.value = false
          console.log('dataSource', dataSource)
        }, 100)
      })
    }

    function getAvatar(id) {
      return userAvatar[id % userAvatar.length]
    }

    function handleSearch() {
      if (searchValue.value) {
        searchUser(searchValue).then((response) => {
          dataSource.value = response.data.data;
        });
      } else {
        fetchData();
      }
    }


    function handleDelete(id) {
      deleteUser({userId:id}).then(() => {
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
        {key: 'userName', dataIndex: 'userName', title: '用户名'},
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
      editUser
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
