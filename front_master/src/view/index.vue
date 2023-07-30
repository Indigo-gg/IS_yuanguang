<template>
  <a-layout style="height: 100vh">
    <a-layout-header class="header" style="height: 10vh">
      <div class="logo" @click="collapseNav">
        <logo color="#000" bg-color="#ee6058"></logo>
      </div>

      <div class="right flex-row-space-around">

        <div class="user">

          <a-dropdown :trigger="['contextmenu']">
            <div>
              <a-avatar style="color: #f56a00; background-color: #fde3cf">{{ user.name.substring(0, 1) }}</a-avatar>
            </div>
            <template #overlay>
              <div style="margin: 2px">
                <a-button shape="round" @click="Logout">
                  退出登录
                  <template #icon>
                    <import-outlined/>
                  </template>
                </a-button>

              </div>
              <!--            <a-menu>-->
              <!--              <a-menu-item key="1"><a-button @click="loginout">退出登录</a-button></a-menu-item>-->
              <!--            </a-menu>-->
            </template>
          </a-dropdown>
        </div>

      </div>
      <div class="head-title">{{ title }}</div>
    </a-layout-header>
    <a-layout-content style="height: 90vh">
      <a-layout style=" background: #fff">
        <a-layout-sider v-model:collapsed="collapsed" width="200" style="height:90vh;background: #fff">
          <a-menu
              @select="navTo"
              v-model:openKeys="openKeys"
              v-model:selectedKeys="selectedKeys"
              mode="inline"
              theme="dark"
              :style="{ height: '100%', borderRight: 0 }">
<!--            <a-menu-item :key="route[0].key">-->
<!--              <template #icon>-->
<!--                <read-outlined/>-->
<!--              </template>-->
<!--              <span class="navName">{{ route.problem.title }}</span>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item :key="route.paper.key">-->
<!--              <template #icon>-->
<!--                <file-text-outlined />-->

<!--              </template>-->
<!--              <span class="navName">{{ route.paper.title }}</span>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item :key="route.user.key">-->
<!--              <template #icon>-->
<!--                <team-outlined></team-outlined>-->
<!--              </template>-->
<!--              <span class="navName">{{ route.user.title }}</span>-->
<!--            </a-menu-item>-->
            <a-menu-item v-for="r in route" :key="r.key">
<!--                            <template #icon>-->
<!--                              <team-outlined></team-outlined>-->
<!--                            </template>-->
             <component :is="$antIcons[r.icon]"></component>
                            <span class="navName">{{ r.title }}</span>
                          </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{   backgroundColor: '#eee',padding: '0 24px', maxHeight: '90vh',height: 'auto',overflowY:'scroll' }">
          <div class="body">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import router from "../router";
import {reactive, toRefs} from "vue";
import {route,app} from "@/view/pageConfig";
import { ImportOutlined} from '@ant-design/icons-vue'

import Logo from "@/components/logo/logo.vue";
import {user} from "@/view/pageConfig";
import {HAS_LOGIN} from "@/store/constant";
import storage from "@/store/store";
import {message} from "ant-design-vue";
import {logout} from "@/api/api";
export default {
  name: "index",
  components: {
    Logo,
    ImportOutlined,
  },
  setup() {
    const state = reactive({
      collapsed: true,
      selectedKeys: ['1'],
      openKeys: [route()[0].key],
      preOpenKeys: [route()[0].key],
      route: route(),
      user,
    });
    console.log('route',state.route)
    const info = () => {
      message.info('退出登录成功');
    };
    const Logout = () => {
      logout().then(res=>{
        if(res.data.code===0){
          setTimeout(()=>{
            info()
            storage.remove(HAS_LOGIN)
            router.go(-1)
          },100)
        }
        else {
          message.info('退出登录失败')
        }
      })


    }


    const navTo = (item) => {
      router.push({path: `/${item.key}`})
      // console.log('route',item)
    }
    const collapseNav = () => {
      state.collapsed = !state.collapsed
    }


    return {
      ...toRefs(state),
      navTo,
      collapseNav,
      Logout,
      title: app.appName,

    }
  }
}
</script>

<style scoped>
.body {
  overflow: scroll;
  height: 100%;
}

.header {
  position: relative;
  background-size: 100% 100%;
  /*filter: blur(1px);*/
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 40px;
  cursor: pointer;
  position: relative;
  right: 10px;
}
</style>
<style>

.head-title {
  color: #FFFFFF;
  position: absolute;
  top: 0px;
  /*color: #333;*/
  font-weight: 550;
  width: 90vw;
  text-align: center;
  font-size: 23px;
}

.time span {
  color: #333;
  font-size: 11px;
  padding-right: 6px;
}

.body {
  margin: 0;
  overflow:scroll;
}
.right{
  position: relative;
z-index: 111;
}
.gpt{
  margin: 0 100px;
}
</style>
