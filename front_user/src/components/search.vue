<template>
  <div class="search-container">
    <div class="search-input">
      <input type="text" v-model="keyword" placeholder="请输入"  @input="autoSuggest" @keyup.enter="search"/>
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

    <div class="res">
      <a-list v-if="results.length"  :pagination="pagination" item-layout="horizontal" :data-source="displayedItems">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                :description="item.content"
            >
              <template #title>
                <a target="_blank" :href="item.website">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar size="large" shape="square" :src="item.imgUrl||require('@/assets/boy.png')" />
              </template>

            </a-list-item-meta>
            <template #extra>
              <a-tag color="blue">{{item.type}}</a-tag>
            </template>
          </a-list-item>
        </template>
      </a-list>

    </div>
<!--    <ul v-if="results.length" class="results-list">-->
<!--      <a-list v-for="(result, index) in displayedItems" :key="index" class="result-item">-->
<!--        -->
<!--&lt;!&ndash;        <a-avatar size="large" :src="result.imgUrl"></a-avatar>&ndash;&gt;-->
<!--        <img style="width: 100px;width: 100px" :src="result.imgUrl||require('@/assets/user_1.png')" alt=""/>-->

<!--        {{result.title + result.content}}</a-list>-->
<!--    </ul>-->
<!--    <div class="pagination" v-if="results.length>0">-->
<!--      <button @click="previousPage" class="pagination-button" :disabled="currentPage === 1">上一页</button>-->
<!--      <span>当前页数：{{ currentPage }}</span>-->
<!--      <button @click="nextPage" class="pagination-button" :disabled="currentPage === totalPages">下一页</button>-->
<!--    </div>-->

  </div>
</template>

<script>
import {esSearch} from "@/api/search";
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
      size: 200
    })
    const pagination = {
      onChange: page => {
       requestParams.page=page
        search()
      },
      pageSize: 10,
    };
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
            results.value = response.data.data.content;
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
      if(requestParams.page>=1){
        requestParams.value -= 1;
        search()
      }

    }

    function nextPage() {
      // 切换到下一页
      currentPage.value += 1;
    }
    onMounted(()=>{
      // keyword.value='凤凰'
      // search()
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
      totalPages,
      pagination


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
.res{
  width: 80vw;
}
</style>
