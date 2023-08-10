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
      <li v-for="(result, index) in paginatedResults" :key="index" class="result-item"
          v-html="highlightText(result)"></li>
    </ul>
    <div class="pagination" v-if="results.length>0">
      <button @click="previousPage" class="pagination-button" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" class="pagination-button" :disabled="currentPage === totalPages">下一页</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {esSearch} from "@/api/search";
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";

export default {

  setup() {
    let keyword = ref('')
    let suggestions = ref([])
    let results = ref([])
    let currentPage = ref()
    let showSuggestions = ref(false)
    const requestParams = reactive({
      currentPage: 1,
      pageSize: 10
    })
    const totalPages = () => {
      return Math.ceil(results.value.length / requestParams.pageSize);
    }
    const paginatedResults = () => {
      const startIndex = (requestParams.currentPage - 1) * requestParams.pageSize;
      const endIndex = startIndex + requestParams.pageSize;
      return results.value.slice(startIndex, endIndex);
    }

    const autoSuggest = () => {
      let flag=false
      setTimeout(()=>{
        if(flag===false){
          flag=true
          esSearch({
            keyword: keyword.value,
            page: requestParams.currentPage,
            size: requestParams.pageSize
          }).then(response => {
            suggestions.value = response.data.data;
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
      esSearch({
        keyword: keyword.value,
        page: requestParams.currentPage,
        size: requestParams.pageSize
      })
          .then(response => {
            console.log('返回的搜索数据',response.data)
            results.value = response.data;
            requestParams.currentPage = 1;
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

    const previousPage =
        () => {
          if (currentPage.value > 1) {
            currentPage.value--;
          }
        }

    const nextPage = () => {
      if (currentPage.value < totalPages) {
        currentPage.value++;
      }
    }


    return {
      keyword,
      suggestions,
      results,
      requestParams,
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
