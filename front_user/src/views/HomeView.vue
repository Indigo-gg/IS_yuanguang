<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <search></search>
    <advanced-search></advanced-search>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import search from'@/components/search.vue'
import advancedSearch from "@/components/advancedSearch.vue"
import paChong from "@/components/paChong";
export default {
  name: 'HomeView',
  components: {
    search,advancedSearch
  }
}
</script>
