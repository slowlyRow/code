<template>
  <div class="about">
    <h1>This is an about page 编码</h1>
    <ul>
      <li v-for="(searchWord) in searchKeys " :key=searchWord.sa>
        {{searchWord.q}}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import storeAbout from '../store/modules/about'

export default {
  asyncData({ store }) {
    store.registerModule('about', storeAbout)
    console.log('store: ', store);
    return store.dispatch('about/getKeywords')
  },
  metaInfo: {
    title: '哎哟',
  },
  destroyed() {
    this.$store.unregisterModule('about')
  },
  computed: {
    ...mapState('about', ['keywords']),
    searchKeys() {
      // return this.$store.state.about.keywords || []
      console.log('this.$store: ', this.$store);
      return this.keywords || []
    },
  },
}
</script>
