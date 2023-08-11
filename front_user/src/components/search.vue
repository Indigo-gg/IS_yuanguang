<template>
  <div class="search-container">
    <div class="search-input">
      <input type="text" v-model="keyword" placeholder="请输入" @input="autoSuggest" @keyup.enter="search"/>
      <div class="sb-container">
        <button class="search-button" @click="search">搜索</button>
      </div>
      <ul v-if="showSuggestions" class="suggestions-list">
        <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">{{
            suggestion
          }}
        </li>
      </ul>
    </div>

    <ul v-if="results.length" class="results-list">
      <li v-for="(result, index) in displayedItems" :key="index" class="result-item">
<!--        <a-avatar size="large" :src="result.imgUrl"></a-avatar>-->
        <img src="result.imgUrl" alt=""></img>

        {{result.title + result.content}}</li>
    </ul>
    <div class="pagination" v-if="results.length>0">
      <button @click="previousPage" class="pagination-button" :disabled="currentPage === 1">上一页</button>
      <span>当前页数：{{ currentPage }}</span>
      <button @click="nextPage" class="pagination-button" :disabled="currentPage === totalPages">下一页</button>
    </div>

  </div>
</template>

<script>
import {esSearch, searchFileByTenant} from "@/api/search";
import {onMounted, reactive, ref,computed} from "vue";
import {message} from "ant-design-vue";

export default {

  setup() {
    let keyword = ref('')
    let suggestions = ref([])
    let results = ref([])
    let currentPage = ref(1)
    let showSuggestions = ref(false)
    let itemsPerPage = 10
    const requestParams = reactive({
      page: 1,
      size: 10
    })
    // const totalPages = () => {
    //   return Math.ceil(results.value.length / requestParams.size);
    // }
    const totalPages = computed(() => {
      // 总页数
      return Math.ceil(results.value.length / itemsPerPage);
    })
    const displayedItems = computed(() => {
      // 当前页展示的数据
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return results.value.slice(start, end);
    })
    const paginatedResults = () => {
      const startIndex = (requestParams.page - 1) * requestParams.size;
      const endIndex = startIndex + requestParams.size;
      let data=results.value.slice(startIndex, endIndex);
      console.log('处理之后的数据',data)
      return data
    }

    const autoSuggest = () => {
      let flag=false
      setTimeout(()=>{
        if(flag===false){
          flag=true
          esSearch({
            keyword: keyword.value,
            page: requestParams.page,
            size: requestParams.size
          }).then(response => {
            suggestions.value = response.data.data.content;
            flag=false
          })
              .catch(error => {
                console.error(error);
              });
        }

      },500)

    }
    const selectSuggestion = (suggestion) => {
      keyword.value = suggestion;
      showSuggestions.value = false;
    }
    const search = () => {
      console.log('发出搜索')
      if(!keyword||keyword.value===''){
        message.error('输入内容不能为空')
      }
      // esSearch({
      //   keyword: keyword.value,
      //   page: requestParams.currentPage,
      //   size: requestParams.pageSize
      // })
      esSearch({
        keyword: keyword.value,
        page: requestParams.page,
        size: requestParams.size
      })
          .then(response => {
            console.log('返回的搜索数据',response.data)
            //results.value = response.data.data.content;
            results.value = [
              {
                "id": "29856906-be57-4a26-806c-87ffd7db83e9",
                "title": "保存单个的测试",
                "content": "aaaahhhhhahaha",
                "website": "www.x.com",
                "imgUrl": null,
                "type": null,
                "tenantCode": "zuel",
                "timestamp": 1691228442419
              },
              {
                "id": "0f90183c-b41f-44a1-a772-d8f9e9d50b96",
                "title": "hhh1",
                "content": "hhh内容1",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "ee5a7edf-833e-45ba-91bb-49a8579a5666",
                "title": "hhh2",
                "content": "hhh内容2",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "90ca48a6-72c0-4d61-9c06-1a917267b7b4",
                "title": "hhh3",
                "content": "hhh内容3",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "8cf3b042-4da1-48e8-9e2c-bd4babeeedb3",
                "title": "hhh4",
                "content": "hhh内容4",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "e1dfcefa-26fd-4256-b479-64bd82d70b58",
                "title": "hhh5",
                "content": "hhh内容5",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "a807a142-948e-480b-8549-f2398f30894a",
                "title": "hhh6",
                "content": "hhh内容6",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "e278b819-8cab-4af3-b3d9-c052f8287e8b",
                "title": "hhh7",
                "content": "hhh内容7",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "89d9302d-d59e-466a-bffa-359a7fb3bdfd",
                "title": "hhh8",
                "content": "hhh内容8",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "2cc1fd5f-0ba6-457e-acd5-90be7ef47747",
                "title": "hhh9",
                "content": "hhh内容9",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "93fb46be-c6d5-4119-be42-b80bed0c0647",
                "title": "hhh10",
                "content": "hhh内容10",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "c3607040-ece8-4838-9979-cc226f276093",
                "title": "hhh11",
                "content": "hhh内容11",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "43fbc2a8-6d63-4834-a2be-cc5438bdc52f",
                "title": "hhh12",
                "content": "hhh内容12",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "335231cc-5241-49c3-b516-9d5328d09a7a",
                "title": "hhh13",
                "content": "hhh内容13",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "b9d40bae-fcf3-49e6-aca5-ca440dd15363",
                "title": "hhh14",
                "content": "hhh内容14",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "4102c313-2ec6-475b-96be-ffafc6741ff9",
                "title": "hhh15",
                "content": "hhh内容15",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "3d19fb1b-6835-409d-b45b-f000e838c176",
                "title": "hhh16",
                "content": "hhh内容16",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "35021d87-3059-4dcd-b769-f1a47fb9235e",
                "title": "hhh17",
                "content": "hhh内容17",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "48c146b6-ca0e-4a20-8c90-83f456f2e4d7",
                "title": "hhh18",
                "content": "hhh内容18",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "6fea2242-b345-4c5c-9a60-36cef12144e9",
                "title": "hhh19",
                "content": "hhh内容19",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "62ddba98-12c8-4d82-bcc7-59ec682cb4d5",
                "title": "hhh20",
                "content": "hhh内容20",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "23d7fe83-2d22-499e-ba4f-b8435146628a",
                "title": "hhh21",
                "content": "hhh内容21",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "264a6c02-9e91-4deb-b415-4ef28516aea8",
                "title": "hhh22",
                "content": "hhh内容22",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "18223647-ef6e-4ad5-80b8-5e80a2133570",
                "title": "hhh23",
                "content": "hhh内容23",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "84c893fd-fef8-4a27-b6cc-90178a1428f8",
                "title": "hhh24",
                "content": "hhh内容24",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "06c1f535-f830-4a2f-b186-ddf40a4eeb14",
                "title": "hhh25",
                "content": "hhh内容25",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "dc6280cb-ab9e-4008-a5d9-ca8f6250cef8",
                "title": "hhh26",
                "content": "hhh内容26",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "56ee9e4e-cb22-4759-b104-d1705204a2ba",
                "title": "hhh27",
                "content": "hhh内容27",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "34dee150-87aa-46dc-a448-2009e12d3a19",
                "title": "hhh28",
                "content": "hhh内容28",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "0c6b2446-ca63-4b2c-818b-a4c476e449ee",
                "title": "hhh29",
                "content": "hhh内容29",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "66284e8e-192f-483c-a37e-9d257fe49981",
                "title": "hhh30",
                "content": "hhh内容30",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "6d0721c2-7bfc-4173-b0b3-666944c2a134",
                "title": "hhh31",
                "content": "hhh内容31",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "5531bc78-29ec-4376-97d2-910934f2f143",
                "title": "hhh32",
                "content": "hhh内容32",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "b745106c-0faa-46a2-a3c1-d4c1dc863eb7",
                "title": "hhh33",
                "content": "hhh内容33",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "abcbc532-4016-47f0-951b-b990f4099dfd",
                "title": "hhh34",
                "content": "hhh内容34",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "b7cf1eec-a0e5-42bb-bc01-2a36aac16bba",
                "title": "hhh35",
                "content": "hhh内容35",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "316c991e-e1fa-4016-a27a-c4041696edbb",
                "title": "hhh36",
                "content": "hhh内容36",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "e9de717c-1f3a-4933-9eff-20037fd0503a",
                "title": "hhh37",
                "content": "hhh内容37",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "a901582d-9001-4e38-85c1-8e5f18c27881",
                "title": "hhh38",
                "content": "hhh内容38",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "b192bd94-9b2f-4649-a8a8-7a6075e52ec6",
                "title": "hhh39",
                "content": "hhh内容39",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "7d7708a0-d2d1-4516-ab64-7788f2656c27",
                "title": "hhh40",
                "content": "hhh内容40",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "4b860ec7-6438-419f-93fd-b6e4aff59f95",
                "title": "hhh41",
                "content": "hhh内容41",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "c38d9558-7a9e-4e04-8411-bda6a69629d3",
                "title": "hhh42",
                "content": "hhh内容42",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "1bcaf5fe-9af2-4504-80e0-7ed70002cbe3",
                "title": "hhh43",
                "content": "hhh内容43",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "0ef6f68a-ed55-4a1d-92fe-05a14ed97317",
                "title": "hhh44",
                "content": "hhh内容44",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "9468cd28-d7c1-4d54-a6c7-b4fdf763b52c",
                "title": "hhh45",
                "content": "hhh内容45",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "4eb46d18-58b9-4fa0-a65b-8843d6aee697",
                "title": "hhh46",
                "content": "hhh内容46",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "fc14dd13-6a5f-447a-ac01-90d0451b618f",
                "title": "hhh47",
                "content": "hhh内容47",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "1051f77d-c223-4153-bafc-b23cb1ee740a",
                "title": "hhh48",
                "content": "hhh内容48",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "2e8f6335-d2fb-4903-a235-53777fca0f7d",
                "title": "hhh49",
                "content": "hhh内容49",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "f7fcdd20-c785-455f-8598-49d2d891db5a",
                "title": "hhh50",
                "content": "hhh内容50",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "a7e66207-3060-4f05-a190-0675a0e13193",
                "title": "hhh51",
                "content": "hhh内容51",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "ce000354-43d1-4c9e-924e-4601396c0ed9",
                "title": "hhh52",
                "content": "hhh内容52",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "f60d5e3d-7089-444e-8bdb-275a061836a8",
                "title": "hhh53",
                "content": "hhh内容53",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "e44539f6-22f8-400d-ae70-f3592eea1315",
                "title": "hhh54",
                "content": "hhh内容54",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "61373abc-74be-4db6-a064-c10fcf808094",
                "title": "hhh55",
                "content": "hhh内容55",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "77be5776-76d5-4b76-b1b9-61ca1aa0d616",
                "title": "hhh56",
                "content": "hhh内容56",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "b6f1836e-c4e5-49a0-9666-a1be27c1be59",
                "title": "hhh57",
                "content": "hhh内容57",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "357c2d2b-87d3-4ad0-a6a1-86d7ae87503e",
                "title": "hhh58",
                "content": "hhh内容58",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "3eec51e5-ac74-452b-b4a0-2002d0e91fdc",
                "title": "hhh59",
                "content": "hhh内容59",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "d3f6a587-3a2b-4bd6-a95a-cb05fc263339",
                "title": "hhh60",
                "content": "hhh内容60",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "6b410ec8-d113-4383-be51-ef8ac70e5098",
                "title": "hhh61",
                "content": "hhh内容61",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "4deee814-8373-4a02-9b41-e2cf18b7ad99",
                "title": "hhh62",
                "content": "hhh内容62",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "c15654c0-a599-4436-8d26-73130cbc4c4c",
                "title": "hhh63",
                "content": "hhh内容63",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "bdd971d8-7f80-4099-b441-cd2061b04711",
                "title": "hhh64",
                "content": "hhh内容64",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "f4ffd8bb-e1c6-4ed6-a883-e04b29d3f8d6",
                "title": "hhh65",
                "content": "hhh内容65",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "f0594c7f-c4cd-46a4-9821-4cc39ef98a9b",
                "title": "hhh66",
                "content": "hhh内容66",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "aabf418e-53f4-4f4e-9c57-8ea8c5b38c23",
                "title": "hhh67",
                "content": "hhh内容67",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "7df0298a-757a-4350-acf8-b065017da6ce",
                "title": "hhh68",
                "content": "hhh内容68",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "d8a7becb-731a-4681-854f-d4dd5f177f9b",
                "title": "hhh69",
                "content": "hhh内容69",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "21e4e781-1b4c-464a-8619-26ab9a29aff8",
                "title": "hhh70",
                "content": "hhh内容70",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "fd70b2dc-23e2-40a8-b98d-91ccb7935a3a",
                "title": "hhh71",
                "content": "hhh内容71",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "3c29ed56-8f58-45cb-bc71-71f8aad77e0b",
                "title": "hhh72",
                "content": "hhh内容72",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "2594ec57-baf7-4489-bef3-64680037543f",
                "title": "hhh73",
                "content": "hhh内容73",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "36a085aa-eaa7-4e48-b7a5-5bcb4b71ec3f",
                "title": "hhh74",
                "content": "hhh内容74",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "fe5c4183-7d7b-4f7f-8b35-aefe772fee48",
                "title": "hhh75",
                "content": "hhh内容75",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "04f4b555-1c0d-4281-98a6-55fae7013dea",
                "title": "hhh76",
                "content": "hhh内容76",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "fad770b2-5856-42d3-8f22-30905e6f2e55",
                "title": "hhh77",
                "content": "hhh内容77",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "15f7c553-52f8-4b0e-8996-ebfb962829ec",
                "title": "hhh78",
                "content": "hhh内容78",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "3652aafc-e1b6-4261-8627-da9af0f6538b",
                "title": "hhh79",
                "content": "hhh内容79",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "95fcb64f-db5d-465e-9e0f-9326a320032d",
                "title": "hhh80",
                "content": "hhh内容80",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "33043435-b1c1-4aa5-b24a-ea42c18c49c5",
                "title": "hhh81",
                "content": "hhh内容81",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "b2c17697-1f0e-48f6-a8fc-0a3f4fed9baf",
                "title": "hhh82",
                "content": "hhh内容82",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "0798de6f-8453-4eea-87e3-46bcdfba2a35",
                "title": "hhh83",
                "content": "hhh内容83",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "07426e58-50e7-4f8e-9120-dc54af31308d",
                "title": "hhh84",
                "content": "hhh内容84",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "77979d03-58a2-4cc4-af60-205fa542f5fa",
                "title": "hhh85",
                "content": "hhh内容85",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "17920aac-44b2-4e63-be97-cac2a5dc6218",
                "title": "hhh86",
                "content": "hhh内容86",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "01bddfff-4485-47f8-809b-3a755aeca8d8",
                "title": "hhh87",
                "content": "hhh内容87",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "099e28d0-66e9-4952-9567-967edd70f912",
                "title": "hhh88",
                "content": "hhh内容88",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "ee872826-be74-440a-8a7f-46fc91589b35",
                "title": "hhh89",
                "content": "hhh内容89",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "5f0a16d9-f2cc-4d43-96d9-77560bd845b9",
                "title": "hhh90",
                "content": "hhh内容90",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "6ce01a3d-5e3e-4b07-8cec-de1061cb156f",
                "title": "hhh91",
                "content": "hhh内容91",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "99cdab63-0ae9-4623-8159-fdaff36a3e22",
                "title": "hhh92",
                "content": "hhh内容92",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "5967d1d0-54e9-4969-b0cb-82330a8f4c67",
                "title": "hhh93",
                "content": "hhh内容93",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "54b6157e-a1b3-4482-9c23-7889099a0bbd",
                "title": "hhh94",
                "content": "hhh内容94",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "5e952e2d-38c4-4d4c-8daf-d686d9086714",
                "title": "hhh95",
                "content": "hhh内容95",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "2c79ec3b-2a42-411b-a920-c2ce1f449fe5",
                "title": "hhh96",
                "content": "hhh内容96",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "aa9e6a6e-e92e-4419-b869-c581b99052b9",
                "title": "hhh97",
                "content": "hhh内容97",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "92e530f6-247f-4fd3-ac0a-8ce7d9ea45c3",
                "title": "hhh98",
                "content": "hhh内容98",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              },
              {
                "id": "20168936-5f4e-4fc2-94c8-2d3ff38e6b66",
                "title": "hhh99",
                "content": "hhh内容99",
                "website": "www.hhh.com",
                "imgUrl": "https://img2.woyaogexing.com/2023/08/02/95eb842745c44516d3b33b96a1a16be1.jpg",
                "type": "test",
                "tenantCode": "zuel",
                "timestamp": 1691228521419
              }
            ];
            requestParams.page = 1;
          })
          .catch(error => {
            console.error(error);
          });
    }
    const highlightText =
        (text) => {
          const pattern = new RegExp(keyword.value, 'gi');
          return text.replace(pattern, '<strong>$&</strong>');
        }

    // const previousPage =
    //     () => {
    //       if (currentPage.value > 1) {
    //         currentPage.value--;
    //       }
    //     }
    //
    // const nextPage = () => {
    //   if (currentPage.value < totalPages) {
    //     currentPage.value++;
    //   }
    // }
    function previousPage() {
      // 切换到上一页
      currentPage.value -= 1;
    }

    function nextPage() {
      // 切换到下一页
      currentPage.value += 1;
    }
    onMounted(()=>{
      // searchFileByTenant({
      //   keyword:'zuel',
      //   ...requestParams
      // }).then(r=>{
      //   console.log('rssult',r)
      // })
    })


    return {
      keyword,
      suggestions,
      results,
      requestParams,
      itemsPerPage,
      displayedItems,
      highlightText,
      previousPage,
      nextPage, autoSuggest,
      selectSuggestion,
      search,
      paginatedResults,
      showSuggestions,
      currentPage,
      totalPages


    };
  },
};
</script>
<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.search-input {
  position: relative;
  display: flex;
  justify-content: space-around;
}

input[type="text"] {

  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.suggestions-list {
  position: absolute;
  top: 40px;
  left: 0;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.search-button {

  background-color: #3498db;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 20px;
  padding: 10px 20px;
  font-size: 16px;
  /*background-color: #007bff;*/
  color: #fff;
  border: none;
  border-radius: 5px;
}

.search-button:hover {
  background-color: #007bff;
}

.results-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.result-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.pagination-button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
}
</style>
