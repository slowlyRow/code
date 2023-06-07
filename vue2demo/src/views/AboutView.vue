<template>
  <div class="about">
    <h1>This is an about page 编码</h1>
    <ul>
      <li v-for="(searchWord,index) in searchKeys " :key=index>
        {{searchWord}}
      </li>
    </ul>
  </div>
</template>
<script>
import storeAbout from '../store/modules/about'

export default {
  asyncData({ store }) {
    store.registerModule('about', storeAbout)
    return store.dispatch('getKeywords')
  },
  metaInfo: {
    title: '哎哟',
  },
  destroyed() {
    this.$store.unregisterModule('about')
  },
  computed: {
    searchKeys() {
      console.log('this.$store.state.keywords: ', this.$store.state.keywords);
      return this.$store.state.keywords || []
    },
  },
}
</script>
