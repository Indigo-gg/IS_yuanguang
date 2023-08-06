<template>
  <search></search>
  <advanced-search></advanced-search>
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
