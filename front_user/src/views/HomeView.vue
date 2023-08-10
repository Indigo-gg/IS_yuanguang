<template>
  <div class="head">
    <a-avatar style="color: #f56a00; background-color: #fde3cf">{{
        user.getUserInfo().userName.substring(0, 1)
      }}
    </a-avatar>

    <a-dropdown v-model:visible="dropdownVisible" @visible-change="handleDropdownVisibleChange">
      <a-menu slot="overlay">
        <a-menu-item key="logout" @click="handleLogout">退出登录</a-menu-item>
      </a-menu>
    </a-dropdown>

  </div>
  <search></search>
  <!--  <advanced-search></advanced-search>-->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import search from '@/components/search.vue'
import advancedSearch from "@/components/advancedSearch.vue"
// import {user} from '@/views/pageConfig';
import {onMounted, ref} from "vue";
import {logout, myInfo} from "@/api/api";
import {user} from "@/views/pageConfig";
import storage from "@/store/store";
import {HAS_LOGIN, USER_INFO} from "@/store/constant";
import {message} from "ant-design-vue";
import router from "@/router";

export default {
  name: 'HomeView',
  components: {
    search, advancedSearch
  },
  setup() {

    let  dropdownVisible=ref(false)

    function handleAvatarClick() {
      dropdownVisible.value = true;
    }
    function handleDropdownVisibleChange(visible) {
      dropdownVisible.value = visible;
    }
    function handleLogout() {
      logout().then(res=>{
        if(res.data.code===0){
          setTimeout(()=>{
            message.success('退出登录成功')
            storage.remove(HAS_LOGIN)
            router.go(-1)
          },100)
        }
        else {
          message.info('退出登录失败')
          storage.remove(HAS_LOGIN)
          router.go(-1)
        }
      }).catch(error=>{
        message.info('退出登录失败'+error)
        storage.remove(HAS_LOGIN)
        router.go(-1)
      })

    }
    onMounted(() => {
      myInfo().then(res => {
        if (res.data.code !== 0) {
          user.removeLoginState()
        } else {
          storage.set(USER_INFO, res.data.data)
        }
      })
    })


    return {
      user,
      dropdownVisible,
      handleLogout,
      handleDropdownVisibleChange
    }
  }
}
</script>
