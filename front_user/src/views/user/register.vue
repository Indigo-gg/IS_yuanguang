<template>
  <div class="login-container">
    <a-row class="login-main">
      <a-col :span="12" class="login-carousel">
        <img :src="require('@/assets/register.png')"/>
      </a-col>
      <a-col :span="12" class="login-form-container">
        <div class="title">{{ name }}</div>
        <a-form ref="form" :model="formData" class="form">
          <a-form-item
              label="账号"
              name="userAccount"
              :rules="[{required: true,  message: '请输入用户名'}]"
          >
            <a-input
                v-model:value="formData.userAccount"
                size="large"
                clearable
                autocomplete="false"
                tabindex="1"
                placeholder="请输入账号"
            >
              <a-icon type="user" class="gray"/>
            </a-input>
          </a-form-item>
          <a-form-item
              label="密码"
              name="userPassword"
              :rules="[{required: true, message: '请输入密码'}]"
          >
            <a-input
                v-model:value="formData.userPassword"
                type="password"
                size="large"
                clearable
                autocomplete="false"
                tabindex="1"
                placeholder="请输入密码"
            >
              <a-icon type="lock" class="gray"/>
            </a-input>
          </a-form-item>
          <a-form-item
              label="密码"
              name="checkPassword"
              :rules="[{required: true, message: '请确认密码'}]"
          >
            <a-input
                v-model:value="formData.checkPassword"
                type="password"
                size="large"
                clearable
                autocomplete="false"
                tabindex="1"
                placeholder="请确认密码"
            >
              <a-icon type="lock" class="gray"/>
            </a-input>
          </a-form-item>
          <a-form-item
              label="租户码"
              name="tenantCode"
              :rules="[{required: true,  message: '请输入租户码'}]"
          >
            <a-input
                v-model:value="formData.tenantCode"
                size="large"
                clearable
                autocomplete="false"
                placeholder="请输入租户码"
            >
              <a-icon type="work" class="gray"/>
            </a-input>
          </a-form-item>
        </a-form>
        <a-row>
          <a-button
              size="large"
              type="primary"
              class="login-btn"
              tabindex="5"
              @click="handleRegister"
              block
          >
            <span>注册</span>
          </a-button>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="foot">
      <a-row type="flex" justify="center">
        Copyright © 2023 - Present
        <a href="javascript:void(0);" target="_blank" style="margin:0 5px;">{{ copyRight }}</a>
        版权所有
      </a-row>
    </a-row>
  </div>
</template>

<script>
import router from "@/router";
import {register} from '@/api/api'
import {reactive, ref, onMounted} from "vue";
import {message} from "ant-design-vue";
import {app} from "@/views/pageConfig";

export default {
  name: 'Login',
  setup() {
    let loading = ref(false)
    const form = ref(null)
    const formData = reactive({
      checkPassword: '',
      tenantCode: "",
      userAccount: '',
      userPassword: ''
    })
    const Register = (data) => {
      return new Promise((resolve) => {
        register(data).then(res => {
          resolve(res)
        })
      })
    }
    const handleRegister = () => {
      loading.value = true
      form.value.validate().then(valid => {
        if (valid) {
          loading.value = true
          Register(formData).then(res => {
            // console.log('返回的登录数据', res)
            if (res.data.code === 0) {
              message.success('注册成功！')
              router.push({path: '/login'})
            } else {
              message.error('注册信息出错，请重新填写')
            }

          }).catch(err=>{
            console.log('注册失败',err)
          }).finally(() => {
            loading.value = false
          })
        }
      })
    }
    //生命钩子
    onMounted(()=>{

      //测试函数手动注册登录用户

      const data = {
        checkPassword: '12345678',
        tenantCode: "zuel",
        userAccount: 'dddd21',
        userPassword: '12345678'
      }
      const test = () => {
        register(data).then(res => {
          console.log('注册的登录信息', res)
        })
      }
      let check=false
      if(check){
        test()
      }
    })
    return {
      redirect: undefined,
      loading,
      msgLoading: false,
      formData,
      form,
      copyRight: app.copyRight,
      name: app.registerPage,
      handleRegister,
      // rules: {
      //   account: [{required: true, trigger: 'blur', message: '请输入用户名'}],
      //   password: [{required: true, trigger: 'blur', message: '请输入密码'}]
      // }
    }
  },


}
</script>

<style lang='less' scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.3)), url("../../assets/register.png") no-repeat;
  background-size: cover;

  .login-main {
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 8px 19px 2px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    background: #FFFFFF;
    width: 800px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .login-carousel {
      height: 500px;

      img {
        border-radius: 18px 0 0 18px;
        display: inline-block;
        height: 100%;
        width: 100%;
        background-size: cover;
      }
    }

    .login-form-container {
      margin-top: 30px;
      padding: 0 50px;

      .title {
        padding: 36px 0 20px 0;
        font-size: 30px;
        text-align: center;
        color: #333333;
      }

      /deep/ .ant-form-item {
        margin-bottom: 14px;
      }

      .forget-pass,
      .other-way {
        font-size: 14px;
      }

      .login-btn,
      .other-login {
        margin-top: 5vh;
      }
    }
  }

  .foot {
    position: absolute;
    left: 50%;
    bottom: 10px;
    //color: rgba(0, 0, 0, 0.45);
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);

    .help {
      margin: 0 auto 2vh;
      width: 60%;

      .item {
        color: rgba(0, 0, 0, 0.45);
      }

      :hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }

    a {
      color: #2d8cf0;
      background: 0 0;
      text-decoration: none;
      outline: 0;
      cursor: pointer;
      transition: color 0.2s ease;
      font-size: 14px;
    }
  }
}
</style>
