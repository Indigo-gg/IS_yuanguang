
<template>
  <div class="search-container">
    <div class="search-input"><input type="text" v-model="keyword" placeholder="请输入" @input="autoSuggest" />
      <ul v-if="showSuggestions">
        <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
      </ul>
    </div>

    <button  class= "search-button" @click="search">搜索</button>
    <ul v-if="results.length" class="results-list">
      <li v-for="(result, index) in paginatedResults" :key="index" class="result-item" v-html="highlightText(result)"></li>
    </ul>
    <div class="pagination">
      <button @click="previousPage" class="pagination-button" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage"  class="pagination-button" :disabled="currentPage === totalPages">下一页</button>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {esSearch} from "@/api/search";

export default {
  data() {
    return {
      keyword: '',
      suggestions: [],
      results: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.results.length / this.pageSize);
    },
    paginatedResults() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.results.slice(startIndex, endIndex);
    }
  },
  methods: {
    autoSuggest() {
      esSearch({
        keyword:this.keyword,
        page:this.currentPage,
        size:this.pageSize
      }).then(response => {
            this.suggestions = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    selectSuggestion(suggestion) {
      this.keyword = suggestion;
      this.showSuggestions = false;
    },
    search() {
      // axios.get(`/api/es/search?keyword=${this.keyword}&page=${this.currentPage}&size=${this.pageSize}`)
      esSearch({
        keyword:this.keyword,
        page:this.currentPage,
        size:this.pageSize
      })
          .then(response => {
            this.results = response.data;
            this.currentPage = 1;
          })
          .catch(error => {
            console.error(error);
          });
    },
    highlightText(text) {
      const pattern = new RegExp(this.keyword, 'gi');
      return text.replace(pattern, '<strong>$&</strong>');
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
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
}

input[type="text"] {
  width: 300px;
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
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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