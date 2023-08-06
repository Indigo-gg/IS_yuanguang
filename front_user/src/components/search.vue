
<template>
  <div>
    <input type="text" v-model="keyword" placeholder="请输入" @input="autoSuggest" />
    <ul v-if="showSuggestions">
      <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
    </ul>
    <button @click="search">搜索</button>
    <ul v-if="results.length">
      <li v-for="(result, index) in paginatedResults" :key="index" v-html="highlightText(result)"></li>
    </ul>
    <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
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
