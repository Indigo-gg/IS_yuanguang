<template>
  <div>
    <div class="filters">
      <span>时间：</span>
      <select v-model="selectedTime">
        <option value="any">不限</option>
        <option value="today">今天</option>
        <option value="pastWeek">过去一周</option>
        <option value="pastMonth">过去一个月</option>
      </select>
      <span>区域位置：</span>
      <select v-model="selectedRegion">
        <option value="any">不限</option>
        <option value="north">北区</option>
        <option value="south">南区</option>
        <option value="east">东区</option>
        <option value="west">西区</option>
      </select>
      <span>文档格式：</span>
      <select v-model="selectedFormat">
        <option value="any">不限</option>
        <option value="pdf">PDF</option>
        <option value="doc">DOC</option>
        <option value="txt">TXT</option>
      </select>
    </div>

    <div class="search-container">
      <input type="text" class="search-input" v-model="searchQuery" @input="handleInput" placeholder="请输入搜索关键字">
      <button  class="search-button" @click="handleSearch">搜索</button>
    </div>

    <ul>
      <li v-for="result in searchResults" :key="result.id">
        <h3>{{ result.title }}</h3>
        <p>{{ result.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import {search} from "@/api/search";

export default {
  data() {
    return {
      selectedTime: 'any',
      selectedRegion: 'any',
      selectedFormat: 'any',
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    async handleSearch() {
      try {
        const response = await search({
          time: this.selectedTime,
          region: this.selectedRegion,
          format: this.selectedFormat,
          query: this.searchQuery,
        })
        this.searchResults = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    handleInput() {
      this.searchResults = [];
    },
  },
};
</script>

<style scoped>
.filters {
  margin-bottom: 10px;
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 5px;
}
select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  border: solid 1px #ccc;
  background: #fff;
  padding: 10px;
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
</style>